import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

    openOrder(){
      const newLocal = `<div class="Container">
              <div class="from-group">
                <input type="text" class="from input-registro m-2 " style="width: 100%; height: 40px;" value="" placeholder="Servicio" > <br>
              <input type="text" class="from input-registro m-2 " style="width: 100%; height: 40px;"  value="" placeholder="Equipo" > <br>
                <input type="" class="from-control input-registro m-2 " style="width: 100%; height: 40px;"  value="" placeholder="Precio" >
              </div>
            </div>`;
      Swal.fire({
      title: "Registro Servicio",
      icon: null,
      html:newLocal ,
            showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar'
    })
      
    }

}
