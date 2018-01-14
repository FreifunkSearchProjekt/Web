import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import {Fields, HitsEntity, SearchResponseRootObject} from './SearchResponse';
import { PagerService } from '../_services'
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public communities: any[] = [{"communityCode":"ffslfl","communityName":"Freifunk Schleswig-Flensburg"}];
  public hits: HitsEntity[];
  public searching: boolean = false;
  public progress: number = 0;
  public maxResults: number = 0;
  private hostDomain: string;
  private communityID: string;
  private value: string;
  private url: string;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: HitsEntity[];

  public searchForm = this.fb.group({
    communityID: [null, Validators.required],
    search: [null, Validators.required]
  });

  constructor(public fb: FormBuilder, private http: HttpClient, private pagerService: PagerService, private config: AppConfig) {  }

  doSearch() {
    this.hits = [];
    this.pagedItems = [];
    this.progress = 0;
    this.maxResults = 0;

    this.hostDomain = this.config.getConfig("hostDomain");
    this.communityID = this.searchForm.controls.communityID.value || this.config.getConfig("defaultCommunityID");
    this.value = this.searchForm.controls.search.value;

    if (!this.value) {
      return
    }

    this.url = 'http://'+this.hostDomain+':9999/clientapi/search/'+this.communityID+'/'+this.value;

    this.searching = true;

    const Maxreq = new HttpRequest('GET', this.url+'/max/', {
      reportProgress: false,
    });

    this.http.request(Maxreq)
      .subscribe(event => {
        switch (event.type) {
          case HttpEventType.Response:
            this.maxResults = <number>event.body;
            // initialize to page 1
            this.setPage(1);
        }
      });
  }

  ngOnInit() {
  }

  setPage(page: number) {
    console.log(this.maxResults)
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.maxResults, page);

    this.searching = true;
    const req = new HttpRequest('GET', this.url+'/'+this.pager.startIndex+'/', {
      reportProgress: true,
    });

    this.http.request(req)
    .subscribe(event => {
      switch (event.type) {
        // handle the download progress event received
        case HttpEventType.DownloadProgress:
          this.progress = 100 * event.loaded / event.total;
          break;

        // handle the response event received
        case HttpEventType.Response:
          // When getting the full response body
          const data:SearchResponseRootObject = <SearchResponseRootObject>event.body;
          this.pagedItems = data.hits;
          if (this.pagedItems.length === 0) {
            let fakeResult: HitsEntity = <HitsEntity>{};
            fakeResult.fields = <Fields>{};
            fakeResult.fields.title = "No Results Found";
            fakeResult.fields.description = "Please Enter another Search Term.";
            this.pagedItems.push(fakeResult);
          }
          this.searching = false;
          break;
      }
    },
      error => {
        if (error.status !== 404) {
          console.error("Got Error while searching: " + JSON.stringify(error, null, 4));
          let fakeResult: HitsEntity = <HitsEntity>{};
          fakeResult.fields = <Fields>{};
          fakeResult.fields.title = "Got Error While Searching";
          fakeResult.fields.description = JSON.stringify(error, null, 4);
          this.pagedItems = [];
          this.pagedItems.push(fakeResult);
        }

        this.searching = false;
      });

    // get current page of items
    //this.pagedItems = this.hits.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
