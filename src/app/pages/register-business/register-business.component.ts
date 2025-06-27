import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../core/services/database.service';
import { AuthUsuarioService } from '../../core/services/auth_fire.service';

@Component({
  selector: 'app-register-business',
  templateUrl: './register-business.component.html',
  styleUrls: ['./register-business.component.css'],
  imports: [ReactiveFormsModule],
})

export class RegisterBusinessComponent {
  businessForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private database: DatabaseService,
    private authService: AuthUsuarioService,
    private router: Router
  ) {
    this.businessForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      businessName: ['', Validators.required],
      businessType: [''],
      phone: [''],
      address: [''],
      website: [''],
      description: [''],
    });
  }

  onSubmit() {

    if (this.businessForm.invalid) {
      this.authService.showMessage('Preencha todos os campos obrigatórios.', true);
      return;
    }

    this.isLoading = true;

    this.authService.register(this.businessForm.value.email, this.businessForm.value.password)
      .then(userCredential => {
        const uid = userCredential.user.uid;
        return this.database.createBusiness(uid, {
          username: this.businessForm.value.username,
          businessName: this.businessForm.value.businessName,
          businessType: this.businessForm.value.businessType,
          phone: this.businessForm.value.phone,
          address: this.businessForm.value.address,
          website: this.businessForm.value.website,
          description: this.businessForm.value.description,
          email: this.businessForm.value.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
          isVerified: false,
          signature: '',
        });
      })
      .then(() => {
        this.authService.showMessage('Empresa cadastrada com sucesso!');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        let msg = 'Erro ao registrar usuário.';

        if (error.code === 'auth/email-already-in-use') {
          msg = 'E-mail já está em uso.';
        } else if (error.code === 'auth/weak-password') {
          msg = 'Senha muito fraca (mínimo 6 caracteres).';
        } else if (error.code === 'auth/invalid-email') {
          msg = 'E-mail inválido.';
        }

        this.authService.showMessage(msg, true);
        console.error('Erro Firebase Auth:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
