import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;
  onSubmit() {
    if (
      this.loginForm.value.email === 'traveler@gmail.com' &&
      this.loginForm.value.password === 'iloveflying'
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('incorrect login details');
    }
  }
}
