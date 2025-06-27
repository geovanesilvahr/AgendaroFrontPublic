import { Component } from "@angular/core";
import { ShowMessageComponent } from "../../shared/components/show-message/show-message.component";
import { FormBuilder, FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthUsuarioService } from "../../core/services/auth_fire.service";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  imports: [FormsModule, RouterLink],
})
export class LoginComponent {
  messages: any[] = [];
  username: string = "";
  password: string = "";

  loadingData: boolean | undefined;
  dadosEncontrados: boolean | undefined;

  constructor(
    private authUser: AuthUsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  login() {

    this.authUser.login(this.username, this.password).then(() => {
      // Handle successful login
      this.dadosEncontrados = true;
      this.loadingData = true;
    }).catch((error) => {
      // Handle login error
      this.dadosEncontrados = false;
      this.loadingData = false;
    });


  }
}
