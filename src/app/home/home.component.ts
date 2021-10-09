import { Component, OnInit } from '@angular/core';
import { SpaceService } from '../services/space.service';
// import { SpaceshipDetailModalPage } from '../modules/spaceship-detail-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  customErrorMessage = '';
  // items: SpaceshipDetailModalPage [] = [];
  items: any = [];
  launchYear: number = 2006;
  successfulLaunch: boolean = true;
  successfulLand: boolean = true;

  constructor(private spaceService: SpaceService) {}

  ngOnInit(): void {
    this.data();
  }

  data() {
    this.spaceService
      .fetchSpaceXData(
        this.launchYear,
        this.successfulLaunch,
        this.successfulLand
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.items = responseData;
        console.log(this.items),
          (error: any) => {
            this.customErrorMessage = '';
          };
      });
  }
}

//  console.log( this.spaceService.fetchSpaceXData().subscribe(() => {
// this.http.get('some url ').subscribe(responseData => console.log(responseData)); year=2001
