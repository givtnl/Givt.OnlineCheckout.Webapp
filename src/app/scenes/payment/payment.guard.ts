import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class PaymentGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let ls = localStorage;
        if (ls.getItem('medium') != null &&
            ls.getItem('paymentMethod') != null &&
            ls.getItem('organisationName') != null &&
            ls.getItem('amount') != null &&
            ls.getItem('logoUrl') != null
        ) {
            return true
        } else {
            return false
        }
    }
}
