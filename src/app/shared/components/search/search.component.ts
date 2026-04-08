import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchText = '';
  @Output() text = new EventEmitter<string>();

  onSearch(value: string): void {
    this.searchText = value;
    this.text.emit(value);
  }

  clearSearch(): void {
    this.searchText = '';
    this.text.emit('');
  }
}
