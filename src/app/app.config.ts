import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes'; 
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { loaderInterceptor } from './core/interceptors/loader/loader.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideToastr(),importProvidersFrom(NgxSpinnerModule),provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loaderInterceptor,errorsInterceptor])) ,provideRouter(routes,withHashLocation()), provideAnimations(),provideClientHydration(withEventReplay())]
};
