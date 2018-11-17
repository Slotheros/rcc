import { Department } from './department';

export interface ManageUserSettings {
  userID: number;
  department: Department;
  userType: number;
  active: boolean;
}
