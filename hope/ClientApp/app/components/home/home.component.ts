import { Component } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {


    player: any;
    viewer: any;
    subscriber: any;


    ngAfterViewInit() {


        // Create a new instance of the WebRTC publisher.
        var publisher = new (<any>window).red5prosdk.RTCPublisher();

        // Create a view instance based on video element id.
        var viewPub = new (<any>window).red5prosdk.PublisherView('red5pro-publisher');
        viewPub.attachPublisher(publisher);



        // Access user media.
        navigator.getUserMedia({
            audio: true,
            video: true
        }, (media)=> {

            console.log( " -------- ", media );

            // Upon access of user media,
            // 1. Attach the stream to the publisher.
            // 2. Show the stream as preview in view instance.
            publisher.attachStream(media);
            viewPub.preview(media);

            ///

            //var protocol = window.location.protocol;
            //var isSecure = protocol.charAt(protocol.length - 2);

            // Using Chrome/Google TURN/STUN servers.
            var iceServers = [{ urls: 'stun:stun2.l.google.com:19302' }];

            // Initialize
            publisher.init({
                protocol: 'ws' , // isSecure ? 'wss' : 'ws',
                host: '52.57.212.168',
                port: 8554, // isSecure ? 8083 : 8081,
                app: 'live',
                streamName: 'mystream',
                iceServers: iceServers
            })
                .then( ()=> {
                    // Invoke the publish action
                    return publisher.publish();
                })
                .catch( (error:any) => {
                    // A fault occurred while trying to initialize and publish the stream.
                    console.error(error);
                });

            ///

        }, (error) => {
            console.error(error);
        });

    }


}