import { Directive } from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appPasswordsDiffer]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordsDifferValidatorDirective, multi: true }]
})
export class PasswordsDifferValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    return passwordsDifferValidator(control);
  }
}

export const passwordsDifferValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const password2 = control.get('password2');
  return password && password2 && password.value !== password2.value ? { passwordsDiffer: true } : null;
};
