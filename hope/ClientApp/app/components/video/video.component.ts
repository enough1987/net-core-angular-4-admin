import { Component } from '@angular/core';


import { HttpService, AuthService } from "../../index";


import { VideoOptions } from "../../index";


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  video1: VideoOptions;
  video2: VideoOptions;


  constructor( private authService: AuthService, private httpService: HttpService) { 
    console.log(" constructor of main " );
  }

  ngOnInit(){
    this.video1 = { path:"../../../assets/video", width: 640, height: 340, autoplay: true  };
    this.video2 = { path:"../../../assets/video", width: 440, height: 240  };
    this.httpService.get("assets/test.json").subscribe(res=>{
      //console.log( " res ", res );
    });
  }


  logout(){
    this.authService.signOut();
  }


}