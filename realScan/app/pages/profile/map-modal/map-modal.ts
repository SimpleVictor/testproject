import {Component} from '@angular/core';
import {ViewController, Platform} from "ionic-angular";
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from 'ionic-native';

declare var google;

@Component({
    templateUrl: 'build/pages/profile/map-modal/map-modal.html'
})
export class MapModal{
    map: GoogleMap;

    constructor(private platform: Platform) {
      platform.ready().then(() => {
        this.loadMap();
      });
    }






      loadMap(){
        // let options = {timeout: 10000, enableHighAccuracy: true};
        // //ENABLE THE FOLLOWING:
        //
        // Geolocation.getCurrentPosition(options).then((position) => {
        //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //   let mapOptions = {
        //     center: {lat: 39.50, lng: -98.35},
        //     zoom: 3,
        //     mapTypeId: google.maps.MapTypeId.ROADMAP
        //   }
        //
        //   this.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
        //   var x = document.querySelector('#map');
        //   console.log(x);

        let location = new GoogleMapsLatLng(-34.9290,138.6010);

        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
          console.log('Map is ready!');
        });

      }

}
