import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, { encoding: 'utf8', stdio: 'inherit', ...options });
  if (result.status !== 0) throw new Error(command + ' failed.');
  return result;
};
const git = (args, options = {}) => run('git', args, options);
const remoteResult = spawnSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8' });
if (remoteResult.status !== 0) throw new Error('Configure the origin remote before deploying.');
const remote = process.env.DEPLOY_REMOTE ?? remoteResult.stdout.trim();
const branch = process.env.DEPLOY_BRANCH ?? 'gh-pages';
run(process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm', ['build:pages'], {
  shell: process.platform === 'win32',
});
const source = path.resolve('apps/site/dist');
const html = await readFile(path.join(source, 'index.html'), 'utf8');
if (!html.includes('/Design/assets/')) throw new Error('The GitHub Pages asset base is incorrect.');
await writeFile(path.join(source, '.nojekyll'), '');
await writeFile(path.join(source, '404.html'), html);
const temporary = await mkdtemp(path.join(os.tmpdir(), 'cinna-pages-'));
const checkout = path.join(temporary, 'checkout');
try {
  git(['clone', '--depth', '1', remote, checkout]);
  const hasBranch =
    spawnSync('git', ['ls-remote', '--exit-code', '--heads', 'origin', branch], {
      cwd: checkout,
      stdio: 'ignore',
    }).status === 0;
  if (hasBranch) {
    git(['fetch', 'origin', branch], { cwd: checkout });
    git(['checkout', '-B', branch, 'FETCH_HEAD'], { cwd: checkout });
  } else git(['checkout', '--orphan', branch], { cwd: checkout });
  for (const entry of await readdir(checkout)) {
    if (entry === '.git') continue;
    const target = path.resolve(checkout, entry);
    if (!target.startsWith(path.resolve(checkout) + path.sep))
      throw new Error('Unsafe deployment path.');
    await rm(target, { recursive: true, force: true });
  }
  await cp(source, checkout, { recursive: true });
  git(['add', '-A'], { cwd: checkout });
  const changed = spawnSync('git', ['diff', '--cached', '--quiet'], { cwd: checkout }).status !== 0;
  if (changed) {
    git(['commit', '-m', 'Publish Design site'], { cwd: checkout });
    git(['push', 'origin', branch], { cwd: checkout });
  } else console.log('No Pages changes to publish.');
} finally {
  if (
    path.dirname(temporary) !== path.resolve(os.tmpdir()) ||
    !path.basename(temporary).startsWith('cinna-pages-')
  )
    throw new Error('Unsafe cleanup path.');
  await rm(temporary, { recursive: true, force: true });
}
