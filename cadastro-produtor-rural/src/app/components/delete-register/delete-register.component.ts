import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from 'src/app/interfaces/register';
import { RegisterService } from 'src/app/shared/services/register-services/register.service';

@Component({
  selector: 'app-delete-register',
  templateUrl: './delete-register.component.html',
  styleUrls: ['./delete-register.component.scss']
})
export class DeleteRegisterComponent implements OnInit {

  register: Register = {
    id: 0,
    cpfCnpjField: '',
    producerName: '',
    farmName: '',
    state: '',
    city: '',
    farmArea: '',
    arableArea: '',
    vegetationArea: '',
    plantedCrops: []
  }

  constructor(
    private service: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.searchById(parseInt(id!)).subscribe((register) => {
      this.register = register
    })
  }

  deleteRegister() {
    if(this.register.id) {
      this.service.deleteRegister(this.register.id).subscribe(() => {
        this.router.navigate(['/producer-list'])
      })
    }
  }

  cancel() {
    this.router.navigate(['/producer-list'])
  }


}
