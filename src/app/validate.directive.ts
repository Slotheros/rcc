import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ValidationService } from './services/validation.service';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

export function nameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const valid = this.validationService.validateName(this.el.nativeElement.value);
    return valid;
  };
}

@Directive({
  selector: '[rccValidate]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateDirective, multi: true}]
})

export class ValidateDirective {

  constructor(private el: ElementRef, private validationService: ValidationService) {  }

  @Input() validateField: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    return this.validateField ? nameValidator(new RegExp(this.validateField, 'i'))(control) : null;
  }

  /*
  @HostListener('blur') onBlur() {
    // this.el.nativeElement.setAttribute('aria-invalid', false);
    // this.el.nativeElement.setAttribute('aria-invalid', false);
    console.log(this.el.nativeElement.attributes['aria-invalid']);
    switch (this.validateField) {
      case 'name' :
        if (!this.validationService.validateName(this.el.nativeElement.value)) {
          // this.el.nativeElement.style.backgroundColor = 'red';
          this.el.nativeElement.setAttribute('aria-required', true);
          this.el.nativeElement.setAttribute('aria-invalid', true);
          console.log(this.el.nativeElement.attributes['aria-invalid']);
        }  else {
          // this.el.nativeElement.style.backgroundColor = 'white';
          this.el.nativeElement.setAttribute('aria-required', false);
          this.el.nativeElement.setAttribute('aria-invalid', false);
          console.log(this.el.nativeElement.attributes['aria-invalid']);
        }
      // case 'email' : break;
    }
  }
  */
}
