import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/shared/services/register.service';
import { validateCpfCnpj } from 'src/app/shared/validators/cpf-cnpj/validateCpfCnpj';
import { StatesService } from 'src/app/shared/services/location/state.service';
import { CitiesService } from 'src/app/shared/services/location/cities.service';

export interface PlantedCrops {
  label: string;
  value: string;
}

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
  cities!: string[];
  selectedCity!: string;
  plantedCrops: PlantedCrops[] = [
    { label: 'Opção1', value: 'opção1'},
    { label: 'Opção2', value: 'opção2'},
    { label: 'Opção3', value: 'opção3'},
    { label: 'Opção4', value: 'opção4'},
    { label: 'Opção5', value: 'opção5'},
  ]

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
      name: ['', Validators.required],
      farmName: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      arableArea: ['', Validators.compose([
        Validators.required
      ])],
      vegetationArea: ['', Validators.compose([
        Validators.required
      ])],
      plantedCrops: []
    });
  }

  register() {
    if(this.form.valid){
      this.service.create(this.form.value).subscribe(() => {
        this.router.navigate(['/home'])
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
    this.cities = this.citiesService.getCities(this.selectedState);
    this.selectedCity = '';
  }

}
