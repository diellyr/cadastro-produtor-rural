import { AbstractControl, ValidationErrors } from '@angular/forms';

export const sumAreaValidator = (control: AbstractControl): ValidationErrors | null => {
  const arableArea = control.get('arableArea')?.value || 0;
  const vegetationArea = control.get('vegetationArea')?.value || 0;
  const farmArea = control.get('farmArea')?.value || 0;

  const totalArea = arableArea + vegetationArea;

  return totalArea <= farmArea ? null : { areasExceeded: true };
};
