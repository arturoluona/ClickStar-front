import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {RestService} from '../rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-trash-users',
  templateUrl: './list-trash-users.component.html',
  styleUrls: ['./list-trash-users.component.css']
})
export class ListTrashUsersComponent implements OnInit {

  public user: any;
  public items = [] as any;
  public search = '';
  constructor(
    private cookieService: CookieService,
    private rest: RestService
  ) {}

  ngOnInit(): void {
    this.user =  JSON.parse(this.cookieService.get('user'));
    this.load(false);
  }

  load(a: any) {
    const query = (a) ? `filter=${a}&fields=ci,name,email,phone` : '';
    this.rest.get(`users/deletedAll?${query}`).subscribe( data => {
      this.items = data;
    });
  }

  OpenModal(data: any){
    this.openOrder(data);
  }

  openOrder(data: any){

    Swal.fire({

      title: 'Detalles Restaurar',
      icon: null,
      html: `
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
      showConfirmButton: true,
      confirmButtonText: 'Restaurar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rest.get(`users/restore/${data._id}`).subscribe(() => this.load(''));
      }
    });
  }

}
