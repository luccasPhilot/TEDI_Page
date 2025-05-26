export interface ITeam {
  id: string;
  group_id?: string | null;
  name: string;
  ra: string;
  image_url: string;
  linkedin_url: string;
  role_name: string;
  creation_date?: string;
}
