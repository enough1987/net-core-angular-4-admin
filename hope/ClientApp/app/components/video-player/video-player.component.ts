import { Component, Input, ViewChild, ElementRef } from '@angular/core';


export class VideoOptions {
    path: string;
    width: number;
    height: number;
    autoplay?: boolean
}

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

    @ViewChild("video") video: ElementRef;

    @Input()
    set options(options: VideoOptions) {
        console.log('got video options: ', options);
        this.videoOptions = options;
    }

    videoOptions: VideoOptions; // it is from input, we get options for player
    isShowenPlayPauseBtn: boolean; // it says if we show or hide btn

    ngAfterViewInit(){
       // if there is autoplay we need to hide btn
       this.isShowenPlayPauseBtn = this.videoOptions.autoplay ? false : true; 
    }

    // if we click on video player we wanna change state of video player ( play/pause )
    playPause():void {
        console.log(this.video);
        if ( this.video.nativeElement.paused || this.video.nativeElement.ended ) {
            this.video.nativeElement.play();
            this.isShowenPlayPauseBtn = false;
        } else {
            this.video.nativeElement.pause();
            this.isShowenPlayPauseBtn = true;
        }
    }


}