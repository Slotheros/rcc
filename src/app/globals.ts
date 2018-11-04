import { Injectable } from '@angular/core';
import { Department } from './department';
import { Policy } from './policy';

@Injectable()
export class Globals {
  departments: Department[] = [
    { id: 1, name: 'Sales' },
    { id: 2, name: 'Garage' },
    { id: 3, name: 'Admin(HR)' },
    { id: 4, name: 'Food & Beverage' },
    { id: 5, name: 'Production' }
  ];

  EMPTY_POLICY = {
    id: null,
    title: '',
    description: null,
    departments: null,
    url: null,
    acknowledged: null,
    date: null
  };

}
