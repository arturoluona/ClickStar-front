import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './App/app.component';
import { RouterModule, Routes } from '@angular/router';
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
import { ChartsModule } from 'ng2-charts';
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
  },
  {
    path:'registro-o',
    component: RegistroOrdenComponent,
  },
  {
    path:'modificar-u',
    component: ModificarUsuarioComponent,
  },
  {
    path:'lista-o',
    component: ListaOrdenComponent,
  },
  {
    path:'lista-c',
    component: ListaClientesComponent,
  },
  {
    path:'registrar-u',
    component: RegistrarUsuarioComponent,
  },
  {
    path:'service',
    component: ServiceComponent,

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
    
  ],
  imports: [
    BrowserModule,ChartsModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
