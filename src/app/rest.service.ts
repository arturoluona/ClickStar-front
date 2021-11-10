import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../environments/environment';
import Swal from 'sweetalert2';
// import {LocalStorageService} from 'ngx-localstorage';
// import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root'
})

export class RestService {
  @Output() snack = new EventEmitter<any>();
  public headers: HttpHeaders;
  public readonly url: string = environment.api;
  // modalRef: BsModalRef;

  constructor(
    // private _storageService: LocalStorageService,
    public http: HttpClient,
    private router: Router,
    // private modalService: BsModalService,
    private cookieService: CookieService) {

  }

  alertDelete(path, id) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(`${path}/${id}`).subscribe(() => {
            Swal.fire(
              'Eliminado!',
              '',
              'success'
            );
            resolve(true);
          })
        }
      })
    })
  }

  clearSession = (redirect = false) => {
    this.cookieService.delete('session', ' / ');
    this.cookieService.delete('user', ' / ');
    if (redirect) {
      this.router.navigate(['/']);
    }
  };

  parseHeader = (custom = null as any) => {
    const token = this.cookieService.get('session');
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (custom) {
      header = custom;
    }
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }
    return new HttpHeaders(header);
  };

  checkSession = (verify = false, redirect = true) => {
    return new Promise((resolve, reject) => {
        if (verify) {
          this.get('token').subscribe(data => {
              this.cookieService.set('session', data.token, environment.daysTokenExpire, '/');
              resolve(data.token);
            },
            e => {
              if (redirect) {
                this.router.navigate(['login']);
                this.clearSession()
              }
              reject(false);
            });
        } else {
          if (this.cookieService.check('session')) {
            resolve(true);
          } else {
            if (redirect) {
              this.router.navigate(['login']);
            }
            reject(false);
          }
        }
      }
    );
  };

  /**
   * TODO esto se puede refactorizar
   * @param code
   * @param message
   * @param e
   */
  handleError = (code = 401, message = '', e: any = {}) => {
    try {
      switch (code) {
        case 401:
          Swal.fire(
            'Error',
            'Sin autorización',
            'error'
          )
          this.clearSession(true);
          break;
        case 404:
          // this.clearSession(true);
          break;
        case 422:
          Swal.fire(
            'Error',
            'Algún campo sin llenar',
            'error'
          )
          break;
        case 402:
          Swal.fire(
            'Error',
            'Si persiste el problema contacta a arturoluna879@gmail.com',
            'error'
          )
          break;
        case 400:
          Swal.fire(
            'Error',
            'Si persiste el problema contacta a arturoluna879@gmail.com',
            'error'
          )
          break;
        default:
          Swal.fire(
            'Error',
            'Si persiste el problema contacta a arturoluna879@gmail.com',
            'error'
          )
          break;
      }
    } catch (e) {
      this.cookieService.delete('session');
      this.cookieService.delete('user');
      return 422;
    }

  };

  post(path = '', body = {}, headerr = null as any): Observable<any> {
    try {
      const header = this.parseHeader(headerr);
      return this.http.post(`${this.url}/${path}`, body, {headers: header})
        .pipe(
          catchError((e: any) => {
            this.handleError(e.status, e.statusText, e.error);
            return throwError({
              status: e.status,
              statusText: e.statusText,
              e
            });
          }),
        );
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  patch(path = '', body = {}): Observable<any> {
    try {
      return this.http.patch(`${this.url}/${path}`, body, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          }),
        );
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  get(path = ''): Observable<any> {
    try {
      return this.http.get(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          }),
        )
    } catch (e) {
      console.log('ERROR', e)
    }
  }

  delete(path = ''): Observable<any> {
    try {
      return this.http.delete(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          }),
        )
    } catch (e) {
      console.log('ERROR', e)
    }
  }
}
