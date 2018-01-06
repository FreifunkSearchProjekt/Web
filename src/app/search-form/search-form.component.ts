import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import {Fields, Hit, SearchResponseRootObject} from './SearchResponse';
import { PagerService } from '../_services'
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public communities: any[] = [{"communityCode":"ffslfl","communityName":"Freifunk Schleswig-Flensburg"}];
  public hits: Hit[];
  public searching: boolean = false;
  public progress: number = 0;
  // pager object
  pager: any = {};

  // paged items
  pagedItems: Hit[];

  public searchForm = this.fb.group({
    communityID: [null, Validators.required],
    search: [null, Validators.required]
  });

  constructor(public fb: FormBuilder, private http: HttpClient, private pagerService: PagerService, private config: AppConfig) {  }

  doSearch() {
    const hostDomain = this.config.getConfig("hostDomain");
    let communityID = this.searchForm.controls.communityID.value || this.config.getConfig("defaultCommunityID");
    const value = this.searchForm.controls.search.value;

    if (!value) {
      return
    }

    const url = 'http://'+hostDomain+':9999/clientapi/search/'+communityID+'/'+value;

    this.searching = true;

    const req = new HttpRequest('GET', url, {
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
            this.hits = data.hits;
            if (this.hits.length === 0) {
              let fakeResult: Hit = <Hit>{};
              fakeResult.fields = <Fields>{};
              fakeResult.fields.Title = "No Results Found";
              fakeResult.fields.Description = "Please Enter another Search Term.";
              this.hits.push(fakeResult);
            }
            this.searching = false;
            // initialize to page 1
            this.setPage(1);
            break;
        }
      },
      error => {
        if (error.status !== 404) {
          console.error("Got Error while searching: " + JSON.stringify(error, null, 4));
          let fakeResult: Hit = <Hit>{};
          fakeResult.fields = <Fields>{};
          fakeResult.fields.Title = "Got Error While Searching";
          fakeResult.fields.Description = JSON.stringify(error, null, 4);
          this.hits = [];
          this.hits.push(fakeResult);
        }
        // initialize to page 1
        this.setPage(1);
        this.searching = false;
      });
  }

  ngOnInit() {
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.hits.length, page);

    // get current page of items
    this.pagedItems = this.hits.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
