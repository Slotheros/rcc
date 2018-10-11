/* Policy interface represents a policy with a description, url, and acknowledged field */
export interface Policy {
  id: number;
  title: string;
  description: string;
  departments: Array<number>;
  url: string;
  acknowledged: boolean;
  date: string;
}
