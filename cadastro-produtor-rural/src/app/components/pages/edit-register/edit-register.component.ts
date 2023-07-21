import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesService } from 'src/app/shared/services/location/cities.service';
import { StatesService } from 'src/app/shared/services/location/state.service';
import { RegisterService } from 'src/app/shared/services/register-services/register.service';
import { sumAreaValidator } from 'src/app/shared/validators/area/sum-area-validator';
import { atLeastOneCheckboxSelectedValidator } from 'src/app/shared/validators/checkcox-validator/checkebox-selected-validator';
import { validateCpfCnpj } from 'src/app/shared/validators/cpf-cnpj/validate-cpf-cnpj';
import { hectaresValidator } from 'src/app/shared/validators/hectares/validate-hectares';

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.scss']
})
export class EditRegisterComponent implements OnInit {

  form!: FormGroup;
  cpfCnpjField!: string;
  states!: string[];
  selectedState!: string;
  cities!: string[];
  farmName!: string;
  submitAttempted: boolean = false;
  plantedCropsLabels = ['Milho', 'Soja', 'Café', 'Algodão', 'Cana de Açucar'];
  plantedCropsValues: string[] = [''];
  selectedPlantedCrops!: ['']
  plantedCropsArray!: FormArray;

  constructor(
    private service: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private statesService: StatesService,
    private citiesService: CitiesService
  ) {
    this.states = this.statesService.getStates();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.searchById(parseInt(id!)).subscribe((register) => {
      this.form = this.formBuilder.group({
        id: [register.id],
        cpfCnpjField:[register.cpfCnpjField, Validators.compose([
          Validators.required,
          validateCpfCnpj
        ])],
        producerName: [register.producerName, Validators.required],
        farmName: [register.farmName, Validators.required],
        state: [register.state, Validators.required],
        city: [register.city, Validators.required],
        farmArea:  [register.farmArea, Validators.compose([
          Validators.required,
          hectaresValidator
        ])],
        arableArea: [register.arableArea, Validators.compose([
          Validators.required,
          hectaresValidator
        ])],
        vegetationArea: [register.vegetationArea, Validators.compose([
          Validators.required,
          hectaresValidator
        ])],
        plantedCrops: [register.plantedCrops, atLeastOneCheckboxSelectedValidator]
      }, { validator: sumAreaValidator }
      );
      this.plantedCropsArray = this.formBuilder.array(
        this.plantedCropsLabels.map(label => {
          return this.formBuilder.control(register.plantedCrops.includes(label));
        }),
        atLeastOneCheckboxSelectedValidator
      );
      this.form.addControl('plantedCrops', this.plantedCropsArray);
      this.cities = this.citiesService.getCities(register.state);
    });
    this.form.get('state')?.setValue('');
    this.onStateChange();
  }

  salveRegister() {
    this.submitAttempted = true;
    console.log('cheguei');
    console.log(this.form.value);
    if(this.form.valid){
      this.service.edit(this.form.value).subscribe(() => {
        this.router.navigate(['/producer-list'])
        console.log('SAIR');
      })
    }
  }

  cancel() {
    this.router.navigate(['/producer-list'])
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

  populatePlantedCrops() {
    const plantedCropsArray = this.formBuilder.array(
      this.plantedCropsLabels.map((label) => {
        return this.formBuilder.control(this.form.value.plantedCrops.includes(label));
      }),
      atLeastOneCheckboxSelectedValidator
    );

    this.form.setControl('plantedCrops', plantedCropsArray);
  }

  getPlantedCropControl(index: number): FormControl {
    return this.plantedCropsArray.at(index) as FormControl;
  }

}
