import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './App/app.component';
import { RouterModule, Routes } from '@angular/router';
import {LoadingBtnDirective} from "./loading-btn.directive";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AuthGuard} from './auth.guard';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ListaEquiposComponent } from './App/lista-equipos/lista-equipos.component';
import { FormLaptopComponent } from './App/lista-equipos/form-laptop/form-laptop.component';
import { FormCpuComponent } from './App/lista-equipos/form-cpu/form-cpu.component';
import { FormPrinterComponent } from './App/lista-equipos/form-printer/form-printer.component';
import { FormMonitorComponent } from './App/lista-equipos/form-monitor/form-monitor.component';
import { FormRouterComponent } from './App/lista-equipos/form-router/form-router.component';
import { FormOthersComponent } from './App/lista-equipos/form-others/form-others.component';
import { InventoryComponent } from './App/inventory/inventory.component';
import {ClienteComponent} from './App/registro-orden/modals/cliente/cliente.component';
import { PcComponent } from './App/registro-orden/modals/pc/pc.component';
import { ImpresoraComponent } from './App/registro-orden/modals/impresora/impresora.component';
import { MonitorComponent } from './App/registro-orden/modals/monitor/monitor.component';
import { RouterComponent } from './App/registro-orden/modals/router/router.component';
import { OtrosComponent } from './App/registro-orden/modals/otros/otros.component'



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
    path:'inventario',
    component: InventoryComponent,
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
  {
    path:'form-laptop',
    component:FormLaptopComponent
  },
  {
    path:'form-cpu',
    component:FormCpuComponent
  },
  {
    path: 'form-printer',
    component:FormPrinterComponent
  },
  {
    path: 'form-monitor',
    component:FormMonitorComponent
  },
  {
    path: 'form-router',
    component:FormRouterComponent
  },
  {
    path: 'form-others',
    component:FormOthersComponent
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
    ListaEquiposComponent,
    FormLaptopComponent,
    FormCpuComponent,
    FormPrinterComponent,
    FormMonitorComponent,
    FormRouterComponent,
    FormOthersComponent,
    InventoryComponent,
    LoadingBtnDirective,
    ClienteComponent,
    PcComponent,
    ImpresoraComponent,
    MonitorComponent,
    RouterComponent,
    OtrosComponent,

  ],
  imports: [
    BrowserModule,ChartsModule,
    RouterModule.forRoot(rutas),    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelectModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
