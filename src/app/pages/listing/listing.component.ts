import { Component, OnInit, HostListener } from '@angular/core';
import { ItemComponent } from '../../components/item/item.component';
import { ApiService } from '../../api.service';
import { SearchComponent } from '../../components/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { ToolbarComponent } from '../../toolbar/toolbar.component';

interface Query {
  text: string | null;
  type: string;
}

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [RouterLink,ItemComponent, SearchComponent, ToolbarComponent],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  items: any[] = [];
  currentQuery: Query = { text: null, type: 'character' };
  pageStep: number = 1;
  pageStepLimit: number = 1;
  username: string|null = localStorage.getItem('username');

  constructor(private api: ApiService, private router: Router) {}

  async search(query: Query): Promise<void> {
    this.currentQuery = query;
    this.pageStep = 1;
    this.items = [];
    const { info, results } = await this.api.search(query.type, query.text ?? '', 1);
    this.items = results;
    this.pageStepLimit = info.pages;
  }

  async more(): Promise<void> {
    this.pageStep += 1;
    const { results } = await this.api.search(this.currentQuery.type, this.currentQuery.text ?? '', this.pageStep);
    this.items = this.items.concat(results);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && this.pageStep < this.pageStepLimit) {
      this.more();
    }
  }

  ngOnInit(): void {
    this.search({ text: null, type: 'character' });
  }
}
