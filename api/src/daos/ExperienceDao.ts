import { BaseDao } from './BaseDao';
import type { Experience } from '../models/Experience';

interface ExperienceRow {
  id: string;
  title: string;
  role: string;
  location: string | null;
  description: string;
  start_date: string;
  end_date: string | null;
  date_precision: string;
  image: string | null;
}

export class ExperienceDao extends BaseDao {
  async listVisible(): Promise<Experience[]> {
    const rows = await this.db.query<ExperienceRow>(
      `select id, title, role, location, description,
              to_char(start_date, 'YYYY-MM-DD') as start_date,
              to_char(end_date, 'YYYY-MM-DD') as end_date,
              date_precision, image
         from experiences
        where visible
        order by position, start_date desc`,
    );
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      role: row.role,
      location: row.location,
      description: row.description,
      startDate: row.start_date,
      endDate: row.end_date,
      datePrecision: row.date_precision === 'month' ? 'month' : 'year',
      image: row.image,
    }));
  }
}
