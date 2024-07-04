import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {

	config: any;

	url = "assets/json/config.json";


	config$ = this.http.get('assets/json/config.json').pipe(
		shareReplay(1),
		tap( r => this.config = r ),
	);
    


	constructor(
		private http: HttpClient,
	) {

	}


	
}

