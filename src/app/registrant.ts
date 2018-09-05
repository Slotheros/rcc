import { Department } from './department';

export interface Registrant {
    fName: string;
    lName: string;
    email: string;
    phoneNum: string;
    department: Department;
    password: string;
}
