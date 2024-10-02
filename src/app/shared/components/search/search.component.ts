import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchText: any = '';
  @Output() text = new EventEmitter<string>();
  onSearch(e: any) {
    this.searchText = e.target.value;
    this.text.emit(this.searchText);
    // console.log(this.searchText);
  }
}
