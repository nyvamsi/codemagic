import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MyLogService } from '../common/log.service';
import { GoogleMapConfig } from '../common/GoogleMapConfig'
import { Geolocation } from '@capacitor/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {

  constructor(private mylogger: MyLogService) {
  }
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  private bfzCoords = new google.maps.LatLng(
    41.833075440573,
    -87.83557422717308
  );

  private bfzBounds = {
    north: 41.840038,
    south: 41.829313,
    east: -87.825743,
    west: -87.844383,
  };

  private map: any;
  private infoWindow = new google.maps.InfoWindow();

  //private options = GoogleMapConfig.getGoogleMapOptions(google);

  private readonly youAreHerePin = GoogleMapConfig.youAreHerePin(google)

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    map: null,
  });


  LocationService = {
    askToTurnOnGPS: async (): Promise<boolean> => {
      return await new Promise((resolve, reject) => {
        LocationAccuracy.canRequest().then((canRequest: boolean) => {
          if (canRequest) {
            // the accuracy option will be ignored by iOS
            LocationAccuracy.request(
              LocationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
            ).then(
              () => {
                resolve(true);
              },
              (error) => {
                resolve(false);
              }
            );
          } else {
            resolve(false);
          }
        });
      });
    },
  };

  private userMarker = new google.maps.Marker({
    icon: this.youAreHerePin,
  });

  private async drawUserPositionMarker() {
    const testCoord = await Geolocation.watchPosition({}, (position, err) => {
      this.userMarker.setPosition(
        new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        )
      );

      this.mylogger.log("Coordinate: Lat: "  + position.coords.latitude);
      this.mylogger.log("Coordinate: Long: " + position.coords.longitude);
    });

  }


  ionViewDidEnter() {
    this.mylogger.log ("TESTING")
    this.showMap();
    this.mylogger.log ("DONE")
  }



  showMap() {

  const options = {
      center: this.bfzCoords,
      zoom: 17,
      disableDefaultUI: true,
      restriction: {
        latLngBounds: this.bfzBounds,
        strictBounds: true,
      },
      styles: [
        {
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
    this.mylogger.log ("TESTING showMap")
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.map.mapTypeId = google.maps.MapTypeId.ROADMAP;
    this.userMarker.setMap(this.map);

    this.drawUserPositionMarker().then((value) => {});



    if(!google || !google.maps){
      this.mylogger.log('Not loaded yet');
    }
    else {
      this.mylogger.log ("Map Loaded")
    }
    this.mylogger.log ("Got Map Object")
    
  }
}


