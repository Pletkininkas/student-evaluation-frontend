import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../shared/menu-item';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth-service.service';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  public isAdmin = false;
  public isCollapsed = false;
  public faSignOutAlt = faSignOutAlt;

  constructor(private loginService: LoginService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getSessionUserRole() === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  coll(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.isCollapsed = false;
    this.loginService.logout();
  }
}
