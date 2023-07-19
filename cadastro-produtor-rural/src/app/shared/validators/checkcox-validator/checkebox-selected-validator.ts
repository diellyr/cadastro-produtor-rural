import { AbstractControl, ValidatorFn } from "@angular/forms";

export const atLeastOneCheckboxSelectedValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const selectedCheckboxes = control.value.filter((value: boolean) => value === true);
  return selectedCheckboxes.length >= 1 ? null : { atLeastOneCheckboxSelected: true };
};

