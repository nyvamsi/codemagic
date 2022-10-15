import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { MyLogService } from '../common/log.service';
import { Geolocation } from '@capacitor/geolocation';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-mapv2',
  templateUrl: 'mapv2.page.html',
  styleUrls: ['mapv2.page.scss']
})

export class Mapv2Page implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

  constructor(private mylogger: MyLogService) {
  }

  myObservable = of(0,60,120,180,240,280,320,359);
  myObserver = {
    next: (x: number) => console.log ('Observer got neext value: ' + x),
    error: (err: string) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
   };

  newheading: Observable<number>;
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

    circle_icon = {
    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    strokeColor: 'blue',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: 'blue',
    fillOpacity: 1,
    rotation: 200,
    scale: 5.0
  };
  
    arrow_icon = {
      path: 'M -1.1500216e-4,0 C 0.281648,0 0.547084,-0.13447 0.718801,-0.36481 l 17.093151,-22.89064 c 0.125766,-0.16746 0.188044,-0.36854 0.188044,-0.56899 0,-0.19797 -0.06107,-0.39532 -0.182601,-0.56215 -0.245484,-0.33555 -0.678404,-0.46068 -1.057513,-0.30629 l -11.318243,4.60303 0,-26.97635 C 5.441639,-47.58228 5.035926,-48 4.534681,-48 l -9.06959,0 c -0.501246,0 -0.906959,0.41772 -0.906959,0.9338 l 0,26.97635 -11.317637,-4.60303 c -0.379109,-0.15439 -0.812031,-0.0286 -1.057515,0.30629 -0.245483,0.33492 -0.244275,0.79809 0.0055,1.13114 L -0.718973,-0.36481 C -0.547255,-0.13509 -0.281818,0 -5.7002158e-5,0 Z',
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: 1,
      fillColor: '#fefe99',
      fillOpacity: 1,
      rotation: 200,
      scale: 1.0
    };

  arrow_icon1 = {
    path: 'M -1.1500216e-4,0 C 0.281648,0 0.547084,-0.13447 0.718801,-0.36481 l 17.093151,-22.89064 c 0.125766,-0.16746 0.188044,-0.36854 0.188044,-0.56899 0,-0.19797 -0.06107,-0.39532 -0.182601,-0.56215 -0.245484,-0.33555 -0.678404,-0.46068 -1.057513,-0.30629 l -11.318243,4.60303 0,-26.97635 C 5.441639,-47.58228 5.035926,-48 4.534681,-48 l -9.06959,0 c -0.501246,0 -0.906959,0.41772 -0.906959,0.9338 l 0,26.97635 -11.317637,-4.60303 c -0.379109,-0.15439 -0.812031,-0.0286 -1.057515,0.30629 -0.245483,0.33492 -0.244275,0.79809 0.0055,1.13114 L -0.718973,-0.36481 C -0.547255,-0.13509 -0.281818,0 -5.7002158e-5,0 Z',
    strokeColor: 'black',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#fefe99',
    fillOpacity: 1,
    rotation: 200,
    scale: 1.0
  };

  arrow_options = {
    label: "User Label",
    title: "User Title",
    //position: { lat:42.12656082401669, lng:-88.46975747292414},
    position: {},
    icon: this.arrow_icon,
    clickable: false,
    draggable: true,
    crossOnDrag: true,
    visible: true,
    animation: 0,
};

ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.arrow_options.position = this.center;

    });

    // this.arrow_options.position =  {lat: 42.12499532453412, lng: -88.4713263154396}

    this.drawUserPositionMarker().then((value) => {});

  }

  private async drawUserPositionMarker() {
    const testCoord = await Geolocation.watchPosition({}, (position, err) => {
      this.user.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };
      let heading = 0;
      if (position.coords.heading < 0) heading = 359;
      if (position.coords.heading > 359) heading = 0;
      //this.arrow_icon.rotation = heading;

      this.circle_icon.rotation = 180;
      //this.arrow_options.icon = this.circle_icon;
      //this.arrow_options.position = {lat: 42.125160431508625, lng: -88.47147472307263};
      // this.arrow_options.position = this.user.position;

     //this.newheading = new Observable<number>(observer => 


      // this.myObservable.subscribe((myObservable) => {
      //   this.circle_icon.rotation = myObservable;
      // });

      this.mylogger.log ("User Heading: " + this.arrow_icon.rotation);
      this.mylogger.log("User Location: Lat: "  + position.coords.latitude);
      this.mylogger.log("User Location: Long: " + position.coords.longitude);
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
