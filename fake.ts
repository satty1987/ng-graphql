import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '../../core/services/okta-auth.service';
import { ActivatedRoute } from '@angular/router';
import { API_URLS } from '../../core/constants/api-urls';
import { NewsService } from 'src/app/core/services/news.service';
import * as _ from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AcceptComponent } from '../accept/accept.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDropdown = false;
  category = API_URLS.category;
  value;
  enableNavigation = false;
  constructor(public _OktaAuthService: OktaAuthService, public router: ActivatedRoute, 
    public dialog: MatDialog,
    public appService: NewsService) { }

  ngOnInit() {
    this.appService.notify.subscribe((response) => {
      this.enableNavigation = response;
    });
    if (!_.isNull(sessionStorage.getItem('userInfo'))) {
      this.enableNavigation = true;
    }
  }
  toggle() {
    this.showDropdown = !this.showDropdown;
  }
  openDialog(): void {
    this.dialog.open(AcceptComponent,
       {
         width: '400px',
         data: sessionStorage.getItem('userInfo')}
    );
   }
}
