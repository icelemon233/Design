import { Button } from '@cinna-design/react';
import { lazy, Suspense, useMemo } from 'react';
import { SiteErrorBoundary } from './components/site/SiteErrorBoundary';
import { docsNavItems } from './docs/navigation';
import { useDocsNavSort } from './hooks/useDocsNavSort';
import { useRoute } from './hooks/useRoute';
import { useSiteLanguage } from './hooks/useSiteLanguage';
import { HomePage } from './pages/HomePage';
const ComponentPage = lazy(() =>
  import('./pages/ComponentPage').then((module) => ({ default: module.ComponentPage })),
);
const routeAliases: Record<string, string> = { dropdown: 'popup' };
export const App = () => {
  const { language, setLanguage } = useSiteLanguage();
  const { route, navigate } = useRoute();
  const { mode: sortMode, setMode: setSortMode } = useDocsNavSort();
  const normalizedRoute = routeAliases[route] ?? route;
  const activeKey = useMemo(
    () => (docsNavItems.some((item) => item.key === normalizedRoute) ? normalizedRoute : undefined),
    [normalizedRoute],
  );
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          main?.focus({ preventScroll: true });
          main?.scrollIntoView();
        }}
      >
        {language === 'zh' ? '跳转到内容' : 'Skip to content'}
      </a>
      <SiteErrorBoundary resetKey={normalizedRoute} language={language}>
        <Suspense
          fallback={
            <main className="site-error" id="main-content" tabIndex={-1}>
              <p role="status">{language === 'zh' ? '正在加载文档…' : 'Loading documentation…'}</p>
            </main>
          }
        >
          {activeKey ? (
            <ComponentPage
              activeKey={activeKey}
              language={language}
              setLanguage={setLanguage}
              navigate={navigate}
              sortMode={sortMode}
              setSortMode={setSortMode}
            />
          ) : normalizedRoute === 'home' ? (
            <HomePage language={language} setLanguage={setLanguage} navigate={navigate} />
          ) : (
            <main className="site-error" id="main-content" tabIndex={-1}>
              <h1>{language === 'zh' ? '页面不存在' : 'Page not found'}</h1>
              <Button onClick={() => navigate('home')}>
                {language === 'zh' ? '返回首页' : 'Back home'}
              </Button>
            </main>
          )}
        </Suspense>
      </SiteErrorBoundary>
    </>
  );
};
