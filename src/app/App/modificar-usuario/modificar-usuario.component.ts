import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { ModificarServiceService } from './modificar-service.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  public items= <any>[];
  public search = '';
  constructor(
    private serviceCliente: ModificarServiceService,
    private rest: RestService    
    ) {}
    

  ngOnInit(): void {
    this.load(false)
  }
  
  load(a: any) {
    const query = (a) ? `filter=${a}&fields=ci,name,email,phone` : '';
    this.rest.get(`users/empleados?${query}`).subscribe( data => {      
      this.items = [];
      data.docs.map(a => {
        this.items.push(a);
      })
    })
  }

  OpenModal(data: any){
    this.serviceCliente.openOrder(data)
  }

}
