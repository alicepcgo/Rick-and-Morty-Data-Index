import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() query = {
    text: null,
    type: 'character'
  }

  @Output() onSearch = new EventEmitter();

  request(){
    this.onSearch.emit(this.query)
  }
}
