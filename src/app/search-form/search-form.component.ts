import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { SearchResponseRootObject } from './SearchResponse';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public communities: any[] = [{"communityCode":"ffslfl","communityName":"Freifunk Schleswig-Flensburg"}];

  public searchForm = this.fb.group({
    communityID: [null, Validators.required],
    search: [null, Validators.required]
  });

  constructor(public fb: FormBuilder, private http: HttpClient) { }

  doSearch() {
    const hostDomain = window.location.hostname;
    const url = 'http://'+hostDomain+':9999/clientapi/search/'+this.searchForm.controls.communityID.value+'/'+this.searchForm.controls.search.value;
    this.http.get<SearchResponseRootObject>(url).subscribe(
      data => {
        data.hits.forEach((value) => {
          console.log(value.fields);
        });
      },
      err => {
        console.error("Error occurred while searching: " + err)
      });
  }

  ngOnInit() {
  }

}
