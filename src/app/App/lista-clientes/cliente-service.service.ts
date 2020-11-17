import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  constructor() { }

  openOrder(data: any){

    Swal.fire(
      {
        
      title: "Detalles",
      icon: null,
      html:`
<div class="card" style="width:100%;">
  <div class="card-body">
    <div class="row" style="background-color:rgb(237, 236, 236);">
        <div class="col-3"><p class="mt-2"><i class="fas text-muted fa-hashtag mr-2"></i>${data?.ID}</p>
        </div>
        <div class="col-9"  style="border-left: solid 1px; border-color:gray;>
          <p class=""><i class="fas text-muted fa-user mt-3 mr-2"></i>Cliente</p>
        </div>
    </div>
    <div class="row mb-1 mt-1">
      <p><i class="fas text-muted fa-file mr-2 ml-2 "></i>${data?.ci}</p>
    </div>
    <div class="row mb-1 mt-1" style="background-color:rgb(237, 236, 236);">
          <p class="mt-2"><i class="fas text-muted fa-user ml-2 mr-2"></i>${data?.nombre}</p>
    </div>
    <div class="row mb-1 mt-1">
        <div class="col-6">
          <p class="text-dat" ><i class="fas text-muted fa-phone mr-1"></i>${data?.tlf1}</p>
        </div>
    
        <div class="col-6" style=" border-left:solid 1px;">
          <p class="text-dat" ><i class="fas text-muted fa-phone mr-1"></i>${data?.tlf2}</p>
        </div>
    </div>
    <div class="row mb-1 mt-1" style="background-color:rgb(237, 236, 236);;">
          <p class="mt-2"><i class="fas text-muted fa-at mr-2"></i>${data?.correo}</p>
    </div>
    <div class="row">
          <p>${data?.direccion}</p>
    </div>

  </div>
</div>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'M'
      }
    )
  }
}
