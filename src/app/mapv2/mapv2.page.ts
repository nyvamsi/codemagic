import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-mapv2',
  templateUrl: 'mapv2.page.html',
  styleUrls: ['mapv2.page.scss']
})
export class Mapv2Page implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  constructor() {}
  zoom = 17;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  markers = [];
  infoContent = '';

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }
  
  click(event: google.maps.KmlMouseEvent) {
    console.log(event);
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()));
  }

  logPosition() {
    let c: any;
    navigator.geolocation.getCurrentPosition((position) => {
      c =  {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    console.log(JSON.stringify(c));
    }
    );


  }

  addMarker() {
    let lat = this.center.lat + ((Math.random() - 0.5) * 2) / 10;
    let lng = this.center.lng + ((Math.random() - 0.5) * 2) / 10;
    this.markers.push({
      position: {
        lat: lat,
        lng: lng,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
    console.log("Put Marker: lat: " + lat + "lng: " + lng);
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content;
    this.info.open(marker);
  }

}
