import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Direction } from '@angular/cdk/bidi';

import { School } from '../../models/school'; // Assuming you have a School model
import { SchoolService } from '../../services/school.service'; // Assuming you have a SchoolService

import { Observable } from 'rxjs';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    MatIconModule,
    RouterOutlet
  ]
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean = false;

  schools!: Observable<School[]>; // Rename users to schools
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private schoolService: SchoolService,
    private router: Router
  ) {}

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.schools = this.schoolService.schools; // Rename users to schools
    this.schoolService.loadAll(); // Rename loadAll() to a method that loads schools

    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }

}