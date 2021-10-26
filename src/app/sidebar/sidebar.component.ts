import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpaceService } from '../services/space.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  customErrorMessage = 'Error';
  items: any;
  year: number = 2014;




  constructor(private spaceService: SpaceService) { }
  years: any = ['2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'];

  ngOnInit(): void {
    this.year = 2014;
  }

  fetchSpaceXData(launchYear: number,successfulLaunch: boolean,successfulLand: boolean) : any {
    this.year = launchYear;
    this.spaceService
      .fetchSpaceXData(
        launchYear,successfulLaunch,successfulLand
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

  changeYear(year: number){
    this.spaceService.getYearEmitter().emit(year);
  }

  changeLaunchSuccess(launch_success : boolean){
    this.spaceService.getLaunchSuccessEmitter().emit(launch_success);
  }
  changeLandSuccess(land_success : boolean){
    this.spaceService.getLandSuccessEmitter().emit(land_success);
  }
}
