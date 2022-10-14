import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-mapv2',
  templateUrl: 'mapv2.page.html',
  styleUrls: ['mapv2.page.scss']
})
export class Mapv2Page implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  constructor() {}
  zoom = 17;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  markers = [];
  infoContent = '';
  user = {
    position: { lat:42.12656082401669, lng:-88.46975747292414},
    label: "User Label",
    title: "User Title",
    options: {
      animation: google.maps.Animation.DROP,
      // setClickable: true,
    },
  }

  arrow_icon = {
    path: 'M -1.1500216e-4,0 C 0.281648,0 0.547084,-0.13447 0.718801,-0.36481 l 17.093151,-22.89064 c 0.125766,-0.16746 0.188044,-0.36854 0.188044,-0.56899 0,-0.19797 -0.06107,-0.39532 -0.182601,-0.56215 -0.245484,-0.33555 -0.678404,-0.46068 -1.057513,-0.30629 l -11.318243,4.60303 0,-26.97635 C 5.441639,-47.58228 5.035926,-48 4.534681,-48 l -9.06959,0 c -0.501246,0 -0.906959,0.41772 -0.906959,0.9338 l 0,26.97635 -11.317637,-4.60303 c -0.379109,-0.15439 -0.812031,-0.0286 -1.057515,0.30629 -0.245483,0.33492 -0.244275,0.79809 0.0055,1.13114 L -0.718973,-0.36481 C -0.547255,-0.13509 -0.281818,0 -5.7002158e-5,0 Z',
    strokeColor: 'black',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#fefe99',
    fillOpacity: 1,
    rotation: -25,
    scale: 1.0
  };

  arrow_options = {
    position: { lat:42.12656082401669, lng:-88.46975747292414},
    icon: this.arrow_icon,
    clickable: false,
    draggable: true,
    crossOnDrag: true,
    visible: true,
    animation: 0,
    title: 'I am a Draggable-Rotatable Marker!',
};

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
    this.infoWindow.open(marker);
  }

}
