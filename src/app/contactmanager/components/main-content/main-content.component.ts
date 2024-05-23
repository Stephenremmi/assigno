import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { School } from '../../models/school'; // Import School model
import { SchoolService } from '../../services/school.service'; // Import SchoolService

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
    standalone: true,
    imports: [
      CommonModule, 
      MatProgressSpinnerModule, 
      MatCardModule, 
      MatIconModule, 
      MatTabsModule
    ]
})
export class MainContentComponent implements OnInit {

  school: School | null | undefined;
  
  private route = inject(ActivatedRoute);
  private schoolService = inject(SchoolService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      this.school = null;

      this.schoolService.schools.subscribe(schools => {
        if (schools.length == 0) return;

        setTimeout(() => {
          this.school = this.schoolService.schoolById(id);
        }, 500)
      });

    })
  }

}