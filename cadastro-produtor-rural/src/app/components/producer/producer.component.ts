import { Component, Input, OnInit } from '@angular/core';
import { Register } from 'src/app/interfaces/register';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit {

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
  }

}
