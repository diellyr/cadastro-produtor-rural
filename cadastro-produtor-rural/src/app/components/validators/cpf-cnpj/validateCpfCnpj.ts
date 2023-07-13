import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Validators } from '../validators';

export const validateCpfCnpj: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const isValidCpf = Validators.validateCPF(value);
  const isValidCnpj = Validators.validateCNPJ(value);

  if (!isValidCpf && !isValidCnpj) {
    return { cpfCnpjInvalido: true };
  }

  return null;
};
