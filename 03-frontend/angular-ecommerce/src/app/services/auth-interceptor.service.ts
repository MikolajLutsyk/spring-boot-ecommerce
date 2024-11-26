import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const securedEndpoints = ['http://localhost:8080/api/orders'];
    if (securedEndpoints.some((url) => request.urlWithParams.includes(url))) {
      // Get access token
      await this.auth.getAccessTokenSilently().forEach((token) => {
        console.log('Access Token: ', token);
        // Clone the request and add new header with access token
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      });
    }
    // Use toPromise instead of lastValueFrom
    return await next.handle(request).toPromise();
  }
}
