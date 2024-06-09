import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../../components/item/item.component';
import { ApiService } from '../../api.service';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [ItemComponent, SearchComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit {
  items: any[] = [];
  
  currentQuery: any = {text:null, type: 'character'};
  pageStep: number = 1;
  pageStepLimit: number = 1

  constructor(private api: ApiService){}

  async search(query: any){
    this.currentQuery = query
    this.pageStep = 1
    this.items = [];
    const {info, results} = await this.api.search(query.type, query.text)
    this.items = results;
    this.pageStepLimit = info.pages
  }

  async more(){
    this.pageStep += 1
    const { results } = await this.api.search(this.currentQuery.type, this.currentQuery.text, this.pageStep)
    this.items = this.items.concat(results);    
  }

  onWindowScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight && this.pageStep < this.pageStepLimit) {
      this.more()
    }
  }

  ngOnInit(): void {
    this.search({text:null, type:'character'});
  }
}
