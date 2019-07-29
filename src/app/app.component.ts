import { Component, OnInit } from '@angular/core';
import { GraphqlService } from './services/graphQL.service';
import {NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graphql';
  HostNameData: any;
  UserNameData: any;
  StoreIDData: any;
  showNew = false;
  isEdit = false;
  isLoader = false;
  isNew = false;
  // p: Number = 1;
   count: Number = 5;


  constructor(private service: GraphqlService) {


  }
  ngOnInit(): void {

  }

  fetchByUserName(uName) {
    this.isLoader = true;
    const data = `{
      getStoreDetails(createdBy: "${uName.value}")
      {
        storeId
        host
        createdBy
        createdOn
        updatedBy
        updatedOn
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      this.HostNameData = hostData.data.getStoreDetails;
      this.isLoader = false;
    },err =>{
      this.isLoader = false;
    });
  }

  fetchByStoreId(storeID) {
    this.isLoader = true;
    const data = `{
      getStoreDetails(storeId: "${storeID.value}")
      {
        storeId
        host
        createdBy
        createdOn
        updatedBy
        updatedOn
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      this.HostNameData = hostData.data.getStoreDetails;
      this.isLoader = false;
    },err =>{
      this.isLoader = false;
    });
  }
  fetchByHostName(hostName) {
    this.isLoader = true;
    const data = `{
      getStoreDetails(host: "${hostName.value}")
      {
        storeId
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      this.HostNameData = hostData.data.getStoreDetails;
      this.isLoader = false;
    },err =>{
      this.isLoader = false;
    });
  }

  onDeleteHost(item: any, index) {
    this.isLoader = true;
    const data = `mutation{
       deleteHost(host: "${item.host}")
      {
        host
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      // this.HostNameData = hostData.data.deleteHost;
      this.HostNameData.splice(index, 1);
      this.isLoader = false;
    },err =>{
      this.isLoader = false;
    });
  }
  onDeleteStore(item: any, index) {
    this.isLoader = true;
    const data = `mutation{
      deleteStoreId (storeId: "${item.storeId}")
      {
        storeId
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      // this.HostNameData = hostData.data.deleteHost;
      this.HostNameData.splice(index, 1);
      this.isLoader = false;
    });
  }
  onEdit(item) {
    this.isEdit = true;
    let hostName: any = document.getElementById('txtPODNameEdit');
    hostName.value = item.host;
    let createdBy: any = document.getElementById('txtUserNameEdit');
    createdBy.value = item.createdBy;

    let storeId: any = document.getElementById('txtStoreIDEdit');
    storeId.value = item.storeId




  }
  onNew(item) {
    this.isEdit = true;
    this.isNew = true;

  }
  updateStoreIdForHost(host: any, storeID: any, userName: any) {
    this.isLoader = true;

    const data = `mutation{
      updateStoreIdForHost (storeId: "${storeID.value}", host: "${host.value}", userName: "${userName.value}")
      {
        storeId
        host
        updatedBy
        updatedOn
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      // this.HostNameData = hostData.data.deleteHost;
      // this.HostNameData.splice(index, 1);
      const store = { value: storeID.value };
      this.fetchByStoreId(store);
      this.isEdit = false;
      this.isLoader = false;

    });
  }
  close() {
    this.isEdit = false;
  }
  createStoreIdForHost(host: any, storeID: any, userName: any) {
    this.isLoader = true;

    const data = `mutation{
      createHostRecordWithStoreId (storeId: "${storeID.value}", host: "${host.value}", userName: "${userName.value}")
      {
        storeId
        host
        createdBy
        createdOn
      }
      }
    `;


    this.service.getDataById(data).subscribe((hostData: any) => {
      // this.HostNameData = hostData.data.deleteHost;
      // this.HostNameData.splice(index, 1);
      const store = { value: storeID.value };
      this.fetchByStoreId(store);
      this.isEdit = false;
      this.isLoader = false;
      this.isNew = false;
    });
  }
  closeContent(){
    this.HostNameData =[];
  }
}