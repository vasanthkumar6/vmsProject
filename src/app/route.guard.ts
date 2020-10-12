import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate():boolean{
    var token=localStorage.getItem("token")

    if(token==undefined){
    return false;
    }
    else{
      return true;
    }
  }
  
}
