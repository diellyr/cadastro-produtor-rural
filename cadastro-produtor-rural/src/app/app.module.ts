import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { HomeComponent } from './components/pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './components/pages/register/register.component';
import { ProducerListComponent } from './components/pages/producer-list/producer-list.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EditRegisterComponent } from './components/pages/edit-register/edit-register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    ProducerListComponent,
    DashboardComponent,
    EditRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
