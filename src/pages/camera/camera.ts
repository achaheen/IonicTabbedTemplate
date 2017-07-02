import {ChangeDetectorRef, Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";

/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  images: string[] = [];
  private options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true
  }

  private selectImageOptions: ImagePickerOptions = {
    quality: 70,
    maximumImagesCount: 2,
    height:800,
    width:600,
    outputType: 1
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public camera: Camera, public detector: ChangeDetectorRef,
              private imagePicker: ImagePicker) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

  }

  takePhoto() {

    this.camera.getPicture(this.options).then((imageData) => {

      this.images.push('data:image/jpeg;base64,' + imageData);
      this.detector.detectChanges();
    }, (err) => {
      console.log("error getting image: " + err);
    });

  }


  selectImages() {
    if (this.imagePicker.hasReadPermission()) {
      this.readImages();
    } else {
      this.imagePicker.requestReadPermission().then(value => this.readImages()).catch(error => alert('Must have permission to select documents'));
    }
  }

  readImages() {

    this.imagePicker.getPictures(this.selectImageOptions).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.images.push('data:image/jpeg;base64,' + results[i]);


      }
      this.detector.detectChanges();
    }, (err) => {
      console.log('Error selecting images:' + err);
    });
  }
}
