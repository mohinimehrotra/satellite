import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpaceService } from '../services/space.service';
// import { SpaceshipDetailModalPage } from '../modules/spaceship-detail-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  customErrorMessage = 'Error';
  // items: SpaceshipDetailModalPage [] = [];
  items: any = [];
  launchYear: number = 2018;
  successfulLaunch: boolean = true;
  successfulLand: boolean = true;
  yearSubcription: Subscription = new Subscription;
  landSuccessSubcription: Subscription = new Subscription;
  launchSuccessSubcription: Subscription = new Subscription;

  constructor(private spaceService: SpaceService) {}

  ngOnInit(): void {

    this.yearSubcription = this.spaceService.getYearEmitter().subscribe((year : number) => {
      this.launchYear = year;
      this.data();
    });
    this.launchSuccessSubcription = this.spaceService.getLaunchSuccessEmitter().subscribe((launch_success : boolean) => {
        this.successfulLaunch = launch_success;
        this.data();
      });
    this.landSuccessSubcription = this.spaceService.getLandSuccessEmitter().subscribe((land_success : boolean) => {
        this.successfulLand = land_success;
        this.data();
    });
    this.data();
  }

  data() {
    this.spaceService
      .fetchSpaceXData(
        this.launchYear,
        this.successfulLaunch,
       this.successfulLand,
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
