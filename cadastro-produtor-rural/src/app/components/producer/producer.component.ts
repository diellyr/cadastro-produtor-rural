import { Component, Input, OnInit } from '@angular/core';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit {
  plantedCropsValue!: string[]

  @Input() register: Register = {
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

  constructor() { }

  ngOnInit(): void {
    this.plantedCropsValue = [];
    for (let index = 0; index < this.register.plantedCrops.length; index++) {
      const element = this.register.plantedCrops[index];
      switch (index) {
        case 0:
            if(element){
              this.plantedCropsValue.push('Milho')
            }
          break;
        case 1:
            if(element){
              this.plantedCropsValue.push('Soja')
            }
          break;
        case 2:
            if(element){
              this.plantedCropsValue.push('Café')
            }
          break;
        case 3:
            if(element){
              this.plantedCropsValue.push('Algodão')
            }
          break;
        case 4:
            if(element){
              this.plantedCropsValue.push('Cana de Açucar')
            }
          break;

        default:
          break;
      }
    }
  }

}
