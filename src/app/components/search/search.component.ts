import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Query {
  text: string | null;
  type: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() query: Query = {
    text: null,
    type: 'character'
  };

  @Output() onSearch: EventEmitter<Query> = new EventEmitter<Query>();

  request(): void {
    this.onSearch.emit(this.query);
  }
}
