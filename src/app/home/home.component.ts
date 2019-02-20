import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ParentComponent from '../app.component';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	menuItems = ParentComponent.menu;
	menuUrls = ParentComponent.urls;
	counts = ParentComponent.counts;
	resp: any;
	title: string = "Все";
	favorites = (this.cookieService.get('favorites') != '') ? JSON.parse(this.cookieService.get('favorites')) : {};
	
	// this.counts[1] = favorites.length;
	// this.counts[2] = deleted.length;
	deleted = (this.cookieService.get('deleted') != '') ? JSON.parse(this.cookieService.get('deleted')) : {};
	@ViewChildren('row') rows: QueryList<any>;
	constructor(private http: HttpClient, private cookieService: CookieService){
		var cookieFavorites = this.cookieService.get('favorites');
		var cookieDelete = this.cookieService.get('deleted');
		this.counts[1] = (cookieFavorites != '' && cookieFavorites != '{}') ? cookieFavorites.split(',').length : 0;
		this.counts[2] = (cookieDelete != '' && cookieDelete != '{}') ? cookieDelete.split(',').length : 0;		
			
		this.http.get('https://api.github.com/emojis')
		.subscribe((response)=>{
			this.resp =   
				Object.keys(response).map(function(key) {
					return [key, response[key]];
				}) 
			this.cookieService.set( 'all_emojis', this.resp.length);
			this.counts[0] = this.resp.length;

		})
	}
	
	ngAfterViewInit() {
		this.rows.changes.subscribe(t => {
			this.ngForRendered();
		})

	}

	ngForRendered() {
		var elems = document.querySelectorAll('.tooltipped');
		M.Tooltip.init(elems,{position:'left'});	
		var toup = document.getElementById('toup');
		toup.onclick = function() {
			window.scrollTo(0, 0);
		}	
		window.onscroll = function() {		
			var pageY = window.pageYOffset || document.documentElement.scrollTop;
			var innerHeight = document.documentElement.clientHeight;		
			if (pageY > innerHeight){
				toup.className = 'btn visible';
			} else {
				toup.className = 'btn';
			}
		}
	}
		
	searchEmoji() {
	  var input, filter, table, tr, td, i, txtValue, tableBody;
	  input = document.getElementById("searchInput");
	  filter = input.value.toUpperCase();
	  tableBody = document.getElementById("table");
	  tr = tableBody.getElementsByClassName('row');


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

	favoriteEmoji(name, elink){
		this.favorites[name] = elink;
		this.cookieService.set( 'favorites', JSON.stringify(this.favorites));
		this.counts[1] = this.cookieService.get('favorites').split(',').length;
	}
	


	deleteEmoji(name, elink){
		this.counts[1] -=1;
		delete this.favorites[name];
		this.cookieService.set( 'favorites', JSON.stringify(this.favorites));
		this.deleted[name] = elink;
		this.cookieService.set( 'deleted', JSON.stringify(this.deleted));
		this.counts[1] = this.cookieService.get('favorites').split(',').length;
		this.counts[2] = this.cookieService.get('deleted').split(',').length;
		
	}

	ngOnInit() {
	}

}
