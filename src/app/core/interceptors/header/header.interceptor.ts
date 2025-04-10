import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let pLATFORM_ID=inject(PLATFORM_ID)
  if(isPlatformBrowser(pLATFORM_ID))
  {
   if(localStorage.getItem("token") !== null)
  {
    req=req.clone({
      setHeaders:{
        token:`3b8ny__${localStorage.getItem('token' )}`!}
    })
  }  
  }
  return next(req);
};
