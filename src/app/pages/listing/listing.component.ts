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
  items: any[] = []
  constructor(private api: ApiService){}

  async search(query: any){
    this.items = []
    this.items = await this.api.search(query.type, query.text)
  }

  ngOnInit(): void {
    this.search({text:null, type:'character'})
  }
}
