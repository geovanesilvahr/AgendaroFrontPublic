import { AuthUsuarioService } from './../services/auth_fire.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthUsuarioService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isUsuarioAutenticado()) {
      this.router.navigate(["/login"]); // Redireciona para login se não autenticado
      return false;
    }
    return true; // Permite acesso se autenticado
  }
}
