import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MyLogService } from '../common/log.service';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage {
  constructor(private mylogger: MyLogService) {}
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  private map: any;
  private infoWindow = new google.maps.InfoWindow();

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
    const options = {
      center: this.bfzCoords,
      zoom: 17,
      disableDefaultUI: true,
      // restriction: {
      //   latLngBounds: this.bfzBounds,
      //   strictBounds: true,
      // },
      styles: [
        {
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
    this.mylogger.log ("TESTING showMap")
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    if(!google || !google.maps){
      this.mylogger.log('Not loaded yet');
    }
    else {
      this.mylogger.log ("Map Loaded")
    }
    this.mylogger.log ("Got Map Object")
    
  }
}


