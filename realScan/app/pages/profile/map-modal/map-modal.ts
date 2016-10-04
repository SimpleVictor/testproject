import {Component, OnInit, ViewChild} from '@angular/core';
import {ViewController, Platform} from "ionic-angular";
import {Geolocation, CameraPosition, GoogleMapsMarkerOptions, GoogleMapsMarker} from 'ionic-native';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from 'ionic-native';

@Component({
    templateUrl: 'build/pages/profile/map-modal/map-modal.html'
})
export class MapModal{
      @ViewChild('map') mapElement;

    constructor(private vControl: ViewController, private platform: Platform) {
      platform.ready().then(() => {
        this.loadMap();
      });
    }

    ionViewDidEnter(){
      // console.log(JSON.stringify(this.map));

    }

    loadMap(){
      console.log("$$$$$");
      console.log(document.querySelector('#map'))
      let map = new GoogleMap(this.mapElement);
      map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);
      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };
      map.moveCamera(position);

// create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Ionic'
      };
      map.addMarker(markerOptions)
        .then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });

      // let options = {timeout: 10000, enableHighAccuracy: true};
      // //ENABLE THE FOLLOWING:
      //
      // Geolocation.getCurrentPosition(options).then((position) => {
      //   // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //   let mapOptions = {
      //     center: {lat: 39.50, lng: -98.35},
      //     zoom: 3,
      //     mapTypeId: google.maps.MapTypeId.ROADMAP
      //   }
      //
      //   this.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
      //   var x = document.querySelector('#map');
      //   console.log(x);
      //
      //   /* var element = angular.element(document.querySelector('#mycart'));
      //    element.text(basket.cartDataCounter());*/
      // });

      // let location = new GoogleMapsLatLng(-34.9290,138.6010);
      //
      // this.map = new GoogleMap('map', {
      //   'backgroundColor': 'white',
      //   'controls': {
      //     'compass': true,
      //     'myLocationButton': true,
      //     'indoorPicker': true,
      //     'zoom': true
      //   },
      //   'gestures': {
      //     'scroll': true,
      //     'tilt': true,
      //     'rotate': true,
      //     'zoom': true
      //   },
      //   'camera': {
      //     'latLng': location,
      //     'tilt': 30,
      //     'zoom': 15,
      //     'bearing': 50
      //   }
      // });
      //
      // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      //   console.log('Map is ready!');
      // });






    }

    dismissModal(){
      this.vControl.dismiss();
    }

}
