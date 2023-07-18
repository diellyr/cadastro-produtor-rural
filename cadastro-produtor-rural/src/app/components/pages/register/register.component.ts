import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validateCpfCnpj } from 'src/app/shared/validators/cpf-cnpj/validateCpfCnpj';
import { StatesService } from 'src/app/shared/services/location/state.service';
import { CitiesService } from 'src/app/shared/services/location/cities.service';
import { RegisterService } from 'src/app/shared/services/register-services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  cpfCnpjField!: string;
  states!: string[];
  selectedState!: string;
  cities: string[] = [];
  selectedCity!: string;

  constructor(
    private service: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder,
    private statesService: StatesService,
    private citiesService: CitiesService
  ) {
    this.states = this.statesService.getStates();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cpfCnpjField:['', Validators.compose([
        Validators.required,
        validateCpfCnpj
      ])],
      producerName: ['', Validators.required],
      farmName: ['', Validators.required],
      state: ['', Validators.required],
      city: [''],
      farmArea:  ['', Validators.compose([
        Validators.required
      ])],
      arableArea: ['', Validators.compose([
        Validators.required
      ])],
      vegetationArea: ['', Validators.compose([
        Validators.required
      ])],
      plantedCrops: [],
    });
    this.form.get('state')?.setValue('');
    this.form.get('city')?.setValue('');

    this.form.get('plantedCrops')?.valueChanges.subscribe((selectedCrops: string[]) => {
      console.log('Culturas Plantadas selecionadas:', selectedCrops);
    });
  }

  register() {
    console.log(this.form.value);
    if(this.form.valid){
      this.service.create(this.form.value).subscribe(() => {
        this.router.navigate(['/home'])
        console.log('cheguei');

      })
    }
  }

  cancel() {
    this.router.navigate(['/home'])
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const sanitizedValue = input.value.replace(/[a-zA-Z]/g, '');
    input.value = sanitizedValue;
  }

  onStateChange() {
    const selectedState = this.form.get('state')?.value;
    this.cities = this.citiesService.getCities(selectedState);
    this.form.get('city')?.setValue('');
  }

}
