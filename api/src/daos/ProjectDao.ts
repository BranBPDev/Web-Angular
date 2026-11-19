import { BaseDao } from './BaseDao';
import type { Project, ProjectKind } from '../models/Project';

interface ProjectRow {
  id: string;
  name: string;
  url: string;
  image: string;
  kind: string;
}

export class ProjectDao extends BaseDao {
  async listVisible(): Promise<Project[]> {
    const rows = await this.db.query<ProjectRow>(
      'select id, name, url, image, kind from projects where visible order by position, created_at',
    );
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      url: row.url,
      image: row.image,
      kind: (row.kind === 'repo' ? 'repo' : 'web') satisfies ProjectKind,
    }));
  }
}
