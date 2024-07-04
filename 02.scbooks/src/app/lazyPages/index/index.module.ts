import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';

import { GroupCarouselComponent } from '../../sharedComponent/group-carousel/group-carousel.component';

//自製的 youbube player
import { YoutubePlayerComponent } from "../../sharedComponent/youtube-player/youtube-player.component";

//來自網路的 youbube player（https://efficientuser.com/2020/03/09/angular-9-youtuber-player-component/）
// import { YouTubePlayerModule } from "@angular/youtube-player";

//自訂的 pipe
import { SharedModule } from "../../shared-module/shared-module.module";


@NgModule({
	declarations: [
		IndexComponent,
		GroupCarouselComponent,
		YoutubePlayerComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		// YouTubePlayerModule,

		RouterModule.forChild([
			{ path: "", component: IndexComponent },
		])
	]
})
export class IndexModule { }
