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
          <div class="row mb-1 mt-1">
            <p *ngIf="false"><i class="fas text-muted fa-file mr-2 ml-2 "></i>${data?.ci}</p>
          </div>
          <div class="row mb-1 mt-1 pt-2 pl-2 rounded" style="background-color:rgb(237, 236, 236);">
                <p class="mt-2"><i class="fas text-muted fa-user ml-2 mr-2"></i>${data?.name}</p>
          </div>
          <div class="row mb-1 mt-2">
              <div class="col-6">
                <p class="text-dat" ><i class="fas text-muted fa-phone mr-1"></i> &nbsp;&nbsp;${data?.phone}</p>
              </div>
          </div>
          <div class="row mb-1 mt-1 pt-2 pl-2 rounded" style="background-color:rgb(237, 236, 236);;">
                <p class="mt-2"><i class="fas text-muted fa-at mr-2"></i>${data?.email}</p>
          </div>
          <div class="row">
                <p><i class="fas text-muted fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp;${data?.country}</p>
          </div>

        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar'
      }
    )
  }
}
