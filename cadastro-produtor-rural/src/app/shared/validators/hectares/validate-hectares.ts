import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const hectaresValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const hectaresPattern = /^\d+(\.\d{1,2})?$/;

  if (!hectaresPattern.test(value.toString()) || parseFloat(value) === 0) {
    return { hectaresInvalidos: true };
  }

  return null;
};
