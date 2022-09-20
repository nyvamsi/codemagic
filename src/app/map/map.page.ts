import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MyLogService } from '../common/log.service';
import { GoogleMapConfig } from '../common/GoogleMapConfig'

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {
  constructor(private mylogger: MyLogService) {}
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  private bfzCoords = new google.maps.LatLng(
    GoogleMapConfig.BFZCENTERCOORDS.lat,
    GoogleMapConfig.BFZCENTERCOORDS.lng
  )

  private map: any;
  private infoWindow = new google.maps.InfoWindow();

  private options = {
    center: this.bfzCoords,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    restriction: {
      latLngBounds: GoogleMapConfig.BFZBOUNDARIES,
      strictBounds: true,
    },
    styles: [
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    map: null,
  });
  private readonly youAreHerePin = {
    url: '../../../assets/icon/you-are-here-icon.png',
    scaledSize: new google.maps.Size(20, 20),
    labelOrigin: new google.maps.Point(12, 30),
  };

  private userMarker = new google.maps.Marker({
    icon: this.youAreHerePin,
  });

  ionViewDidEnter() {
    this.mylogger.log ("TESTING")
    this.showMap();
    this.mylogger.log ("DONE")
  }


  showMap() {
    this.mylogger.log ("TESTING showMap")
    this.map = new google.maps.Map(this.mapRef.nativeElement, this.options);

    if(!google || !google.maps){
      this.mylogger.log('Not loaded yet');
    }
    else {
      this.mylogger.log ("Map Loaded")
    }
    this.mylogger.log ("Got Map Object")
    
  }
}


