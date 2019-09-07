import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-seat-availability',
  templateUrl: './seat-availability.component.html',
  styleUrls: ['./seat-availability.component.scss']
})
export class SeatAvailabilityComponent implements OnInit {
  dataList = [];
  totalParking = 0;
  allocateParking = 0;
  availableParking = 0;
  constructor(public apiService: NewsService) { }
 

  ngOnInit() {
    const path = '';
    this.apiService.getHttpRequest(path).subscribe((data) => {
      this.transformData(data);
    });
  }
  transformData(data) {
    this.totalParking = _.sumBy(data, (item: any) => {
      return item.totalParking;
    });
    this.allocateParking = _.sumBy(data, (item: any) => {
      return item.AllocatedParking;
    });
    this.availableParking = this.totalParking - this.allocateParking;

  }
}
