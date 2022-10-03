import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MyLogService } from '../common/log.service';
import { GoogleMapConfig } from '../common/googlemapconfig'
import { Geolocation } from '@capacitor/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { GlobalConstants } from '../common/global-constants';

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

  private map: any;
  private infoWindow = new google.maps.InfoWindow();

  private readonly youAreHerePin = GoogleMapConfig.youAreHerePin(google)
  private options = GoogleMapConfig.getGoogleMapOptions(google)

  

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

      this.mylogger.log("User Location: Lat: "  + position.coords.latitude);
      this.mylogger.log("User Location: Long: " + position.coords.longitude);
    });

  }


  ionViewDidEnter() {
    this.mylogger.log ("TESTING")
    this.showMap();
    this.mylogger.log ("DONE")
  }



  showMap() {
    this.mylogger.log ("Start showMap")

    // this.mylogger.log ("Map Options Center Latitude: " + GoogleMapConfig.CENTERCOORDS.lat)
    // this.mylogger.log ("Map Options Center Longitude: " + GoogleMapConfig.CENTERCOORDS.lng )

    //let pos = GoogleMapConfig.getCenterLocation();
    //this.options.center = pos;
    this.map = new google.maps.Map(this.mapRef.nativeElement, this.options);
    //this.map = GoogleMapConfig.setCenterLocation(this.map);
    //this.map.setCenter(GoogleMapConfig.getCenterLocation())

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


