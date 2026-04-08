<<<<<<< HEAD
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
=======
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
<<<<<<< HEAD
  searchText = '';
  @Output() text = new EventEmitter<string>();

  onSearch(value: string): void {
    this.searchText = value;
    this.text.emit(value);
  }

  clearSearch(): void {
    this.searchText = '';
    this.text.emit('');
=======
  searchText: any = '';
  @Output() text = new EventEmitter<string>();
  onSearch(e: any) {
    this.searchText = e.target.value;
    this.text.emit(this.searchText);
    // console.log(this.searchText);
>>>>>>> 9d0bc879dbfa2144d6e38b7402ea0f2148b95ad2
  }
}
