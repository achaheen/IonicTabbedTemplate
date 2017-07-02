import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {CameraPosition, GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, MarkerOptions} from "@ionic-native/google-maps";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
  }


  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);
    let firstZoom: boolean = true;
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        map.setCompassEnabled(true);
        map.setIndoorEnabled(true);
        map.setClickable(true);
        map.setTrafficEnabled(true);
        map.setMyLocationEnabled(true);
        console.log('Map is ready!');
        console.log('Get my location');
        let watchLocation = this.geolocation.watchPosition();


        watchLocation.subscribe((data) => {


            let position: CameraPosition = {
              target: new LatLng(data.coords.latitude, data.coords.longitude),
              zoom: 10,
              tilt: 15
            };
            if ( firstZoom) {
              map.moveCamera(position).then(e => firstZoom = false);
            }



        });

        for (let coordinate of this.listOfCoordinates()) {
          let markerOptions: MarkerOptions = {

            position: coordinate,
            title: 'Landmark'
          };

          map.addMarker(markerOptions);

        }

        // create CameraPosition

        // move the map's camera to position
        //map.moveCamera(position);

        // create new marker


      }
    );

    // create LatLng object

  }

  listOfCoordinates(): Array<LatLng> {
    let list: Array<LatLng> = [
      new LatLng(24.720909, 46.766226),
      new LatLng(24.738060, 46.758243),
      new LatLng(24.713658, 46.804249)
      , new LatLng(24.742504, 46.707174)
      , new LatLng(24.766490, 46.698356)
      , new LatLng(24.750803, 46.672742)
    ];

    return list;
  }

}
