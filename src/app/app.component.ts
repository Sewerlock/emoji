import { Component, ViewChildren, ElementRef, AfterViewInit, QueryList} from '@angular/core';
import { NewServiceService } from './new-service.service';
import { HttpClient } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { Tooltip } from "materialize-css";


export const menu = ["Все", "Любимые", "Удалённые"];
export const urls = ["", "/favorites", "/deletes"];
export var counts = [0,0,0];

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})



export class AppComponent {
	constructor(){}
	
}
