import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      chatId: ['', [Validators.required, Validators.minLength(16)]],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get chatId() {
    return this.loginForm.get('chatId');
  }

  hasNoAuthToken(): boolean {
    return !JSON.parse(localStorage.getItem('auth')).auth_token ;
  }

  joinChat(): void {
    console.log(JSON.stringify(this.loginForm.getRawValue()));

    if (this.loginForm.valid) {
      localStorage.setItem('auth', JSON.stringify({
        username: this.username.value,
        password: this.password.value,
        auth_token: 'yes'
      }));

      this.router.navigate(['/room'], {
        queryParams: {
          id: this.chatId.value,
        },
      });
    }
  }

  ngOnInit(): void {
    const localAuth = JSON.parse(localStorage.getItem('auth'));

    this.username.setValue(localAuth.username);
    this.password.setValue(localAuth.password);    
  }
}
