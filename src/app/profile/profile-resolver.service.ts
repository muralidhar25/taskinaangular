import { Injectable} from '@angular/core';

import { Resolve,Router , ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { Account } from './model';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';

@Injectable()
export class ProfileResolverService implements Resolve<Account> {
   constructor (
       private profileSvc: ProfileService,
       private router: Router
   ) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account> {
       return this.profileSvc.userData()
           .map(account => {
               if (account) {
                   return account;
               } else {
                   this.router.navigate(['/']);
                   return null;
               }
           })
           .catch(error => {
               this.router.navigate(['/']);
               return Observable.empty(null);
           });
   }
}