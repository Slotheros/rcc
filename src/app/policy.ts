/* Policy interface represents a policy with a description, url, and acknowledged field */
export interface Policy {
  id: number;
  description: string;
  url: string;
  acknowledged: boolean;
  date: string;
}
