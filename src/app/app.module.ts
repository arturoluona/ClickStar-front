import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './App/app.component';
import { RouterModule, Routes } from '@angular/router';
import {LoadingBtnDirective} from "./loading-btn.directive";
import {RestService} from './rest.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AuthGuard} from './auth.guard';

import { HomeComponent } from './App/home/home.component'
import { LoginComponent } from './App/login/login.component';
import { NavbarComponent } from './App/navbar/navbar.component';
import { PerfilComponent } from './App/perfil/perfil.component';
import { RegistroOrdenComponent } from './App/registro-orden/registro-orden.component';
import { ListaOrdenComponent } from './App/lista-orden/lista-orden.component';
import { RegistrarUsuarioComponent } from './App/registrar-usuario/registrar-usuario.component';
import { ModificarUsuarioComponent } from './App/modificar-usuario/modificar-usuario.component';
import { ServiceComponent } from './App/service/service.component';
import { ListaClientesComponent } from './App/lista-clientes/lista-clientes.component';
import { PieComponent } from './App/graficos/pie/pie.component';
import { BarrasComponent } from './App/graficos/barras/barras.component';




const rutas: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/home',
  }
    ,
   {
     path: 'home', component: HomeComponent
   },

   {
     path: 'login',
       component: LoginComponent,

  },
  {
    path:'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'registro-o',
    component: RegistroOrdenComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'modificar-u',
    component: ModificarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'lista-o',
    component: ListaOrdenComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'lista-c',
    component: ListaClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'registrar-u',
    component: RegistrarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'service',
    component: ServiceComponent,
    canActivate: [AuthGuard]
  },
  

]

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    LoginComponent, 
    NavbarComponent,
    PerfilComponent, 
    RegistroOrdenComponent,
    ListaOrdenComponent, 
    RegistrarUsuarioComponent, 
    ModificarUsuarioComponent,
    ServiceComponent,
    ListaClientesComponent,
    PieComponent,
    BarrasComponent,
    LoadingBtnDirective
  ],
  imports: [
    BrowserModule,ChartsModule,
    RouterModule.forRoot(rutas),    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
