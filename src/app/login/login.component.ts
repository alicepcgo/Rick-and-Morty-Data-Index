import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void{
    if (localStorage.getItem('username')) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    localStorage.setItem('username', this.email);
    this.router.navigate(['/']);
  }
}
