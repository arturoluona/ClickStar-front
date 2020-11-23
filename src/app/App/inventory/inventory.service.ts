import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }
  openOrder(data: any){
    console.log(this.openOrder)
      Swal.fire({

        title: "Detalles Producto",
       icon: null,
       html:`<div class="card" style="width:100%;">
       <ul class="list-group list-group-flush">
         <li class="list-group-item"> <h5>Producto:</h5> <p>Memoria Ram ddr3 2GB Laptop <p></li>
         <li class="list-group-item"><h5> Stock:22</h5>  
         <br>
         <button type="button" class="btn btn-success"style="border-radius:50%;"><i class="fas text-light fa-plus"></i></button>
         <button type="button" class="btn btn-danger" style="border-radius:50%;"><i class="fas text-light fa-minus"></i></button> 
         
         </li>
         <li class="list-group-item"><h5>Proveedor:</h5> <p>SysmaSystem</p></li>
       </ul>
       <div class="card-body">
       <textarea class="form-control " disabled>sdsdsdsds</textarea>
       </div>
     </div>`,
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: '<i class="fas text-light fa-redo"></i>'
      })


  }
}
