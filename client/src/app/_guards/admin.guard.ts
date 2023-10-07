import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  /**
   *
   */
  constructor(
    private accountService: AccountService,
    private toaster: ToastrService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (!user) {
          return false;
        }
        if (user.roles.includes("Admin") || user.roles.includes('Moderator')) {
          return true;
        } else {
          this.toaster.error('You cannot enter this area!');
          return false;
        }
      })
    );
  }
  
}
