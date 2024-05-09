//Se importa esta librería para poder inyectar dependencias sin constructor de clase

import { inject } from '@angular/core';

import { Observable, map, tap } from 'rxjs';

import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router

  const authService: AuthService = inject(AuthService);

  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap( isAuthenticated => console.log('isAuthenticated Public', isAuthenticated) ),
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['/heroes']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};

//No hay necesidad de crear una clase, simplemente definiendo una función flecha y exportándola, podemos utilizar sus funcionalidades de guard en el app-routing

export const PublicGuard: CanMatchFn = (
  //Tipado CanMatchFN

  route: Route,

  segments: UrlSegment[]
) => {

  return checkAuthStatus();
};