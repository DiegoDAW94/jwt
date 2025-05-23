import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { TokenService } from "./token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + accessToken
        }
      });
    }
    return next.handle(req);
  }
}