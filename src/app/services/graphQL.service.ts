import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {HttpClient, HttpHeaders} from  '@angular/common/http';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
// import { OwnerType } from './types/ownerType';
// import { OwnerInputType } from './types/ownerInputType';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Store = {
    storeId: string
    host: string
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
  }
  export type Query = {
      allStores: Store[];
  }
@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
//   public owners: OwnerType[];
//   public owner: OwnerType;
//   public createdOwner: OwnerType;
//   public updatedOwner: OwnerType;
 
constructor(private apollo: Apollo, public http : HttpClient) {}

getDataById(data){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  const query = {
    "query": data,
    "variables": null,
    "operationName": null
  };

  return this.http.post('/graphql',  query, httpOptions);

    this.apollo.watchQuery<Query>({
        query: gql`
            query getHostsByStoreId($storeId: String!) {
                storeId
                host
                createdBy
                createdOn
                updatedBy
                updatedOn
          }
        `,
        variables: { storeId: 436 },
      }).valueChanges
      .subscribe(data => {
       console.log(data);
      });
}
} 