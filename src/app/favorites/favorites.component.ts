import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ParentComponent from '../app.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

	menuItems = ParentComponent.menu;
	menuUrls = ParentComponent.urls;
	counts = ParentComponent.counts;
	title: string = "Любимые";
	objectKeys = Object.keys;
	favorites = (this.cookieService.get('favorites') != '') ? JSON.parse(this.cookieService.get('favorites')) : {};
	deleted = (this.cookieService.get('deleted') != '') ? JSON.parse(this.cookieService.get('deleted')) : {};
	

	constructor(private cookieService: CookieService){
		var all_emojis = this.cookieService.get('all_emojis');
		var cookieFavorites = this.cookieService.get('favorites');
		var cookieDelete = this.cookieService.get('deleted');
		this.counts[0] = (all_emojis != '' && all_emojis != '{}') ? +all_emojis : 0;
		this.counts[1] = (cookieFavorites != '' && cookieFavorites != '{}') ? cookieFavorites.split(',').length : 0;
		this.counts[2] = (cookieDelete != '' && cookieDelete != '{}') ? cookieDelete.split(',').length : 0;		
	}
	
	ngAfterViewInit() {
		var elems = document.querySelectorAll('.tooltipped');
		M.Tooltip.init(elems,{position:'left'});	
	}	
	

	searchEmoji() {
	  // Declare variables 
	  var input, filter, table, tr, td, i, txtValue, tableBody;
	  input = document.getElementById("searchInput");
	  filter = input.value.toUpperCase();
	  tableBody = document.getElementById("table");
	  // tr = tableBody.getElementsByTagName("tr");
	  tr = tableBody.getElementsByClassName('row');

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByClassName("col")[0];
		if (td) {
		  txtValue = td.textContent || td.innerText;
		  if (txtValue.toUpperCase().indexOf(filter) > -1) {
			tr[i].style.display = "";
		  } else {
			tr[i].style.display = "none";
		  }
		} 
	  }
	}	


	deleteEmoji(name){
		delete this.favorites[name];
		this.cookieService.set( 'favorites', JSON.stringify(this.favorites));	
		var cookieFavorites = this.cookieService.get('favorites');
		this.counts[1] = (cookieFavorites != '' && cookieFavorites != '{}') ? cookieFavorites.split(',').length : 0;		
	}
	
	ngOnInit() {
	}

}
