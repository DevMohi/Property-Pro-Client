export interface ICategory {
  _id: string;
  name: string;
  description: string;
  parent: string | null;
  isActive: boolean;
  icon: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  children: ICategory[];
}
