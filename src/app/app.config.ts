import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpHandlerFn, HttpRequest, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(
    withInterceptors([BaseUrlInterceptor])
  )],
};


function BaseUrlInterceptor(req:HttpRequest<unknown>,next:HttpHandlerFn){
  var token = localStorage.getItem('token')
  if(token != null){
    const newReq = req.clone({
      url: 'http://localhost:5182/api/' + req.url,
      headers: req.headers.set('Accept','application/json').set('Accept','application/json').set('Authorization','Bearer ' + token)
    });
    return next(newReq);
  }else{
    const newReq = req.clone({
      url: 'http://localhost:5182/api/' + req.url,
      headers: req.headers.set('Accept','application/json').set('Accept','application/json')
    });
    return next(newReq);
  }
}