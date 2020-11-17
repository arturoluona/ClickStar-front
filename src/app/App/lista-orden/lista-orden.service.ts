import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ListaOrdenService {


  constructor() { }

  openOrder(data: any){

    Swal.fire({
      title: "Detalle Orden",
      icon: null,
      html:`<div class="card" style="width:100%;">
      <div class="card-body">
        <h5 class="card-title">#${data.ID}</h5>
        <h4>${data.name}</h4>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Equipo: ${data.type}</li>
        <li class="list-group-item">${data.date.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}</li>
        <li class="list-group-item">Status: ${data.status}</li>
      </ul>
      <div class="card-body">
      <textarea class="form-control " disabled>${data.description}</textarea>
      </div>
    </div>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar'
    }).then((a) => {
      if (a.isConfirmed) {
       this.divice(data.divice.id);

      }
    })
  }
  divice(id: any) {
    throw new Error('Method not implemented.');
  }

  updateOrder(){
    Swal.fire({
      title: 'Descripcion',
      input: 'textarea',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar'          
    }).then(a => {
      console.log('textArea', a.value)
    })
  }
 }