import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioService {

  private usuarioAutenticado: boolean = false;
  mostrarHaircutEmitter = new EventEmitter<boolean>();

  constructor(
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(res => {
        this.usuarioAutenticado = true;
        this.router.navigate(['/dashboard']);
        this.showMessage(`Bem-vindo, ${res.user.email}!`);
      })
      .catch(() => {
        this.usuarioAutenticado = false;
        this.showMessage('Usuário e/ou Senha Incorreta!', true);
      });
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.usuarioAutenticado = false;
      this.router.navigate(['/login']);
      this.showMessage('Logout realizado com sucesso!');
    });
  }

  isUsuarioAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
