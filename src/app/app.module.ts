import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {LoadingBtnDirective} from './loading-btn.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AuthGuard} from './auth.guard';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import {NumberPickerModule} from 'ng-number-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ServiceWorkerModule } from '@angular/service-worker';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroOrdenComponent } from './registro-orden/registro-orden.component';
import { ListaOrdenComponent } from './lista-orden/lista-orden.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { ServiceComponent } from './service/service.component';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { PieComponent } from './graficos/pie/pie.component';
import { ListaEquiposComponent } from './lista-equipos/lista-equipos.component';
import { InventoryComponent } from './inventory/inventory.component';
import {ClienteComponent} from './registro-orden/modals/cliente/cliente.component';
import { PcComponent } from './registro-orden/modals/pc/pc.component';
import { ImpresoraComponent } from './registro-orden/modals/impresora/impresora.component';
import { MonitorComponent } from './registro-orden/modals/monitor/monitor.component';
import { RouterComponent } from './registro-orden/modals/router/router.component';
import { OtrosComponent } from './registro-orden/modals/otros/otros.component';
import { environment } from '../environments/environment';
import { ListTrashUsersComponent } from './list-trash-users/list-trash-users.component';

const rutas: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
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
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario',
    component: InventoryComponent,
  },
  {
    path: 'registro-o',
    component: RegistroOrdenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modificar-u',
    component: ModificarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-o',
    component: ListaOrdenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-c',
    component: ListaClientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-papelera-usuarios',
    component: ListTrashUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-u',
    component: RegistrarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'service',
    component: ServiceComponent
  },
  {
    path: 'lista-equipos',
    component: ListaEquiposComponent,
    canActivate: [AuthGuard]
  }
];

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
    ListaEquiposComponent,
    InventoryComponent,
    LoadingBtnDirective,
    ClienteComponent,
    PcComponent,
    ImpresoraComponent,
    MonitorComponent,
    RouterComponent,
    OtrosComponent,
    ListTrashUsersComponent
  ],
  imports: [
    BrowserModule, ChartsModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgSelectModule,
    TagInputModule,
    BrowserAnimationsModule,
    NgJsonEditorModule,
    NumberPickerModule,
    NgxDropzoneModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
