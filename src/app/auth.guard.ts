import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {RestService} from './rest.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: RestService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  canActivate(): any {
    // If the user is not logged in we'll send them back to the home page
    let queryParameters = {};
    this.route.queryParams.subscribe(a => {
      queryParameters = a;
    });
    return this.authService.checkSession(true, true).then(a => {
      return true;
    }).catch(e => {
      return false;
    });
  }


}
