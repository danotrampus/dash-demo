import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as shaka from 'shaka-player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('videoPlayer', { static: true }) videoElementRef: ElementRef;
  videoElement: HTMLVideoElement;

  manifestUri = 'http://localhost:3000/mpd';

  ngAfterViewInit() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.videoElement = this.videoElementRef.nativeElement;
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  private initPlayer() {
    // Create a Player instance.
    // var video = document.getElementById('video');
    const player = new shaka.Player(this.videoElement);

    // Attach player to the window to make it easy to access in the JS console.
    // window.player = player;

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player.load(this.manifestUri).then(() => {
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    }).catch(this.onError);  // onError is executed if the asynchronous load fails.
  }

  private onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  private onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }
}
