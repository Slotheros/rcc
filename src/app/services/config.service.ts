import { Injectable } from '@angular/core';
import { Department } from '../department';

const departments: Department[] = [
  { id: 1, name: 'Sales' },
  { id: 2, name: 'Garage' },
  { id: 3, name: 'Admin(HR)' },
  { id: 4, name: 'Food & Beverage' },
  { id: 5, name: 'Productions' }
];

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  constructor() { }

  getDepartments(): Department[] {
    return departments;
  }
}
