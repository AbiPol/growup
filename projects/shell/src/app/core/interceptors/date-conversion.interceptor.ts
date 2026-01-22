import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateConversionInterceptor implements HttpInterceptor {
  // Expresión regular para detectar strings en formato ISO 8601
  private iso8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:Z|(?:\+|-)(?:\d{2}):?(?:\d{2}))?$/;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        // Si el evento es una respuesta HTTP y tiene cuerpo (body)
        if (event instanceof HttpResponse && event.body) {
          // Clonamos el cuerpo para modificarlo de forma segura
          const body = this.convertToDate(event.body);
          // Devolvemos una nueva respuesta con el cuerpo ya transformado
          return event.clone({ body });
        }
        return event;
      })
    );
  }

  private convertToDate(body: any): any {
    if (body === null || body === undefined) {
      return body;
    }

    if (Array.isArray(body)) {
      // Si es un array, iteramos sobre cada elemento
      body.forEach(item => this.convertToDate(item));
    } else if (typeof body === 'object') {
      // Si es un objeto, iteramos sobre sus propiedades
      for (const key of Object.keys(body)) {
        const value = body[key];
        if (typeof value === 'string' && this.iso8601.test(value)) {
          // Si el valor es un string de fecha, lo convertimos a un objeto Date
          body[key] = new Date(value);
        } else if (typeof value === 'object') {
          // Si es otro objeto o array, llamamos a la función recursivamente
          this.convertToDate(value);
        }
      }
    }
    return body;
  }
}
