import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class FormOthersService {

  constructor() { }

  openOrder(data: any){
    console.log(this.openOrder)
     Swal.fire({
       title: "Detalle Orden",
       icon: null,
       html:`<div class="card" style="width:100%;">
       <div class="row">
       <div class="col-4">
           <p>#341</p>
         </div>
       <div class="col-8" style="border-left:solid 1px;">
         <p>Jeffrey Rafael Caceres</p>
       
       </div>
         
       </div>
       <ul class="list-group list-group-flush">
         <li class="list-group-item">Equipo: $</li>
         <li class="list-group-item">Fecha</li>
         <li class="list-group-item">Status: Entregado</li>
       </ul>
       <div class="card-body">
       <textarea class="form-control " disabled>sdsdsdsds</textarea>
       </div>
     </div>`,
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Actualizar'
     })
   }
}
