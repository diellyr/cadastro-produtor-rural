import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/interfaces/register';
import { RegisterService } from 'src/app/shared/services/register-services/register.service';

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrls: ['./producer-list.component.scss']
})
export class ProducerListComponent implements OnInit {

  registeredItems: Register[] = [];

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
