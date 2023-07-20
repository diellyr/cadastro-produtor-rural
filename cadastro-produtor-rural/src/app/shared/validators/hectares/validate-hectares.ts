import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const hectaresValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const hectaresPattern = /^\d+(\.\d{1,2})?$/;
  const parsedValue = parseFloat(value);

  if (!hectaresPattern.test(value.toString()) || (parsedValue === 0 && control.parent?.get('farmArea')  === control) || (parsedValue === 0 && control.parent?.get('arableArea')  === control)) {
    return { hectaresInvalidos: true };
  }

  return null;
};
