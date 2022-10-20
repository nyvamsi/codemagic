import { MyLogService } from './log.service';

export class GoogleMapConfig {
    constructor(private mylogger: MyLogService) {}

    public static CENTERCOORDS = { 
      lat:42.12656082401669, 
      lng:-88.46975747292414,
    };

    //public static CENTERCOORDS = { lat: -34.397, lng: 150.644 };
    public static DEFAULTMAPZOOM = 17;
    public static DISABLEDEFAULTUI = true;

    public static getCenterLocation(): any {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          if (position) {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            console.log ("getCurrentLocation: lat: " + pos.lat)
            console.log ("getCurrentLocation: lng " + pos.lng)
            return pos;
          }
          else {
            alert ("Unable to get position")
          }
        },
          (error: GeolocationPositionError) => console.log(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    public static setCenterLocation(mymap: any): any {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          if (position) {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            console.log ("getCurrentLocation: lat: " + pos.lat)
            console.log ("getCurrentLocation: lng " + pos.lng)
            mymap.setCenter(pos)
            return mymap;
          }
          else {
            alert ("Unable to get position")
          }
        },
          (error: GeolocationPositionError) => console.log(error));
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    public static getGoogleMapOptions (googlemaps: any): any{
      return {
        center: GoogleMapConfig.CENTERCOORDS,
        //center:  GoogleMapConfig.getCurrentLocation(),
        zoom: GoogleMapConfig.DEFAULTMAPZOOM,
        mapTypeId: googlemaps.maps.MapTypeId.ROADMAP,
        disableDefaultUI: GoogleMapConfig.DISABLEDEFAULTUI,
        styles: [
          {
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
      };
    };

    public static getYouAreHerePin (googlemaps: any): any {
      return new googlemaps.maps.Marker({
        icon: this.youAreHerePin(googlemaps)
      });
    };

    public static youAreHerePin (googlemaps: any): any {
      return {
        url: '../../../assets/icon/you-are-here-icon.png',
        scaledSize: new googlemaps.maps.Size(20, 20),
        labelOrigin: new googlemaps.maps.Point(12, 30),
      };
    };

    

}