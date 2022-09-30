import { MyLogService } from './log.service';


export class GoogleMapConfig {
    constructor() {}

    public static BFZCENTERCOORDS = { 
      lat:41.833075440573, 
      lng:-87.83557422717308,
    };

    public static BFZBOUNDARIES = {
      north: 41.840038,
      south: 41.829313,
      east: -87.825743,
      west: -87.844383,
    };

    public static DEFAULTMAPZOOM = 17;

    public static getGoogleMapOptions (googlemaps: any): any{
      return {
        center: GoogleMapConfig.BFZCENTERCOORDS,
        zoom: 17,
        mapTypeId: googlemaps.maps.MapTypeId.ROADMAP,
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

    }

    public static youAreHerePin (googlemaps: any): any {
      return {
        url: '../../../assets/icon/you-are-here-icon.png',
        scaledSize: new googlemaps.maps.Size(20, 20),
        labelOrigin: new googlemaps.maps.Point(12, 30),
      };
    }

}