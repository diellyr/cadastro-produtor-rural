import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { validateCpfCnpj } from '../../validators/cpf-cnpj/validateCpfCnpj'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private service: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
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
      arableArea: [0, Validators.compose([
        Validators.required
      ])],
      vegetationArea: [0, Validators.compose([
        Validators.required
      ])],
      plantedCrops: ['', Validators.required]
    })
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
}
