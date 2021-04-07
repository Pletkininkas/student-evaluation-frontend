import { MenuItem } from './../shared/menu-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  public menuItems: MenuItem[];

  ngOnInit(): void {
    this.menuItems = [
      {
        path: '/students',
        title: 'All Students',
      },
      {
        path: '/myevaluations',
        title: 'My Evaluations',
      },
      {
        path: '/evaluate',
        title: 'Create/Edit Evaluation',
      },
    ];
  }

  title = 'student-evaluation-frontend';
}
