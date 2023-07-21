import { Component, Input, OnInit } from '@angular/core';
import { Register } from 'src/app/interfaces/register';
import { RegisterService } from 'src/app/shared/services/register-services/register.service';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.scss']
})
export class ProducerListComponent implements OnInit {

  registeredItems: Register[] = [];
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

  constructor(
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.loadRegisteredItems();
  }

  loadRegisteredItems(): void {
    this.registerService.getRegisteredItems().subscribe(
      (items) => {
        this.registeredItems = items;
      },
      (error) => {
        console.error('Erro ao obter os itens cadastrados:', error);
      }
    );
  }
}
