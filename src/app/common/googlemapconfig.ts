import { MyLogService } from './log.service';


export class GoogleMapConfig {
    constructor() {}

    public static CENTERCOORDS = { 
      lat:42.12656082401669, 
      lng:-88.46975747292414,
    };

    public static BOUNDARIES = {
      north: 41.840038,
      south: 41.829313,
      east: -87.825743,
      west: -87.844383,
    };

    public static DEFAULTMAPZOOM = 17;

    public static getGoogleMapOptions (googlemaps: any): any{
      return {
        center: GoogleMapConfig.CENTERCOORDS,
        zoom: 17,
        mapTypeId: googlemaps.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: [
          {
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
      };
    }

    public static getYouAreHerePin (googlemaps: any): any {
      return new googlemaps.maps.Marker({
        icon: this.youAreHerePin(googlemaps)
      });
    }

    public static youAreHerePin (googlemaps: any): any {
      return {
        url: '../../../assets/icon/you-are-here-icon.png',
        scaledSize: new googlemaps.maps.Size(20, 20),
        labelOrigin: new googlemaps.maps.Point(12, 30),
      };
    }

    

}