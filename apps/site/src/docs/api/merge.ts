import type { ApiContent, ApiSection } from '../../types';

export function mergeApiSections(curated: ApiContent, generated: ApiSection[]): ApiSection[] {
  const sections: ApiSection[] =
    curated.length && Array.isArray(curated[0])
      ? [{ title: generated[0]?.title ?? '', rows: curated as ApiSection['rows'] }]
      : (curated as ApiSection[]).map((section) => ({ ...section, rows: [...section.rows] }));
  for (const section of generated) {
    const existing = sections.find((item) => item.title === section.title);
    if (!existing) sections.push(section);
    else
      for (const row of section.rows) {
        const index = existing.rows.findIndex((item) => item[0] === row[0]);
        if (index < 0) existing.rows.push(row);
        else
          existing.rows[index] = [
            row[0],
            existing.rows[index][1],
            row[2],
            row[3] === '-' ? existing.rows[index][3] : row[3],
          ];
      }
  }
  return sections;
}
