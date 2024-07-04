
/*

自製 youtube player，在 index.html 載入 iframe_api

<script id="api" src="https://www.youtube.com/iframe_api"></script>


*/

import { Component, OnInit, EventEmitter } from '@angular/core';

/**
 * 本元件的 HTML 使用 Bootstrap 5 的樣式
 */
@Component({
	selector: 'my-youtube-player',	
	templateUrl: './youtube-player.component.html',

	inputs: ["video: videoID", "start"],
	outputs: ["timeChange", "playerReady", "stateChange"]
})

export class YoutubePlayerComponent implements OnInit {

	private YT: any;
	video: string = "";
	start: number = 0;
	private player: any;
	private intervalID: any;

	w:any = window;

	playerID:string = "player_" + Math.ceil(Math.random()*10000);

	timeChange: EventEmitter<number>;
	playerReady: EventEmitter<string>;
	stateChange: EventEmitter<string>;

	constructor() {
		this.timeChange = new EventEmitter();
		this.playerReady = new EventEmitter();
		this.stateChange = new EventEmitter();


		
		
	}
	ini(){
		this.loadAPI();

		//函數不存在才建立，這個函數是 api 載入完成後觸發
		//若之前已經載入則不會觸發，要手動執行

		// 2019 舊版正常
		if (!this.w['onYouTubeIframeAPIReady']) {
			this.w['onYouTubeIframeAPIReady'] = (e: any) => {
				this.youTubeReady();
			};
		} 
	}
	ngOnInit() {
		
	}

	//view 建置完成才初始化
	ngAfterViewInit(){
		this.ini();
	}

	private loadAPI() {		


		var apiTag = document.getElementById("api");

		if (apiTag) {
			//之前已載入 api
			this.youTubeReady();

		} else {


			//未載入 api
			var tag = document.createElement('script');
			tag.id = "api";
			tag.src = 'https://www.youtube.com/iframe_api';
			var firstScriptTag = document.getElementsByTagName('script')[0];

			if(firstScriptTag.parentNode){
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			}

			// console.log("load API 結束！！");

		}
	}
	
	private youTubeReady() {

		// console.log("youTube player 準備好了！");		

		this.YT = this.w['YT'];


		//舊版元素名稱使用 'player'，但多個元件會造成干擾，所以此處 ID 改用 video, 缺點是同一頁不能載入同一影片。
		//this.player = new this.w['YT'].Player('player', {
		
		if (this.w['YT']) {
			this.player = new this.w['YT'].Player(this.video, {
				videoId: this.video,
				playerVars: { 'autoplay': 0, 'rel': 1, 'controls': 1, start: this.start },
				events: {
					'onStateChange': this.onPlayerStateChange.bind(this),
					'onError': this.onPlayerError.bind(this),
					'onReady': (e: any) => {
						this.playerReady.emit("player ready!");
					}
				}
			});
		}
		
	}

	private onPlayerStateChange(event: any) {
		// console.log(event);
		var state: string | undefined;
		switch (event.data) {
			case this.YT.PlayerState.PLAYING:
				state = "PLAYING";
				// if (this.currentTime == 0) {
					// console.log('started ' + this.currentTime);
				// } else {
					// console.log('playing ' + this.currentTime)
				// };
				break;
			case this.YT.PlayerState.PAUSED:
				state = "PAUSED";
				// if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
					// console.log('paused' + ' @ ' + this.currentTime);
				// };
				break;
			case this.YT.PlayerState.ENDED:
				state = "ENDED";
				// console.log('ended ');
				break;
		};
		this.stateChange.emit(state);
	};

	/*************************/

	//2021 new
	loadVideoById(videoID: string, start: number){

		if(start == 0){start = 1;}

		this.player.loadVideoById(
			{
				'videoId': videoID,
               	'startSeconds': start
			});
	}


	//公用方法	
	playVideo() {
		this.player.playVideo();
	}
	playVideoFrom(seconds: number) {
		this.seekTo(seconds, true);
		this.playVideo();
	}
	pauseVideo() {
		this.player.pauseVideo();
	}
	stopVideo() {
		this.player.stopVideo();
	}
	seekTo(seconds: number, allowSeekAhead: boolean) {
		this.player.seekTo(seconds, allowSeekAhead);
	}

	startTimeChange(){
		this.intervalID = setInterval(()=>{
			this.onTimeChange();
		}, 30);
	}
	stopTimeChange(){
		clearInterval(this.intervalID);
	}

	getVideoData(){
		return this.player.getVideoData();
	}

	//狀態或屬性
	get currentTime(): number {
		return Math.round(this.player.getCurrentTime());
	};
	get isPlaying(): boolean {
		return this.player.getPlayerState() == 1;
	}

	//playingTimeChangeEvent
	private onTimeChange(){
		this.timeChange.emit(this.currentTime);
		
	}


	//Error
	onPlayerError(event: any) {
		switch (event.data) {
			case 2:
				console.error('請求包含無效的參數值：' + this.video);
				break;
			case 100:
				console.error('找不到請求的影片。');
				break;
			case 101 || 150:
				console.error('影片所有者不允許在嵌入式播放器中播放。');
				break;
		};
	};

}
