import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, ToolbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  username: string|null = localStorage.getItem('username');
  email: string = this.username?.toLowerCase() + "@email.com";

  constructor(private router: Router){}
  logout(): void {
    localStorage.removeItem('username')
    this.router.navigate(['/login'])
  }
}
