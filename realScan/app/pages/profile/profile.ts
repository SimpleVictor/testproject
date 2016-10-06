import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Slides, ModalController, PopoverController, LoadingController, NavParams} from 'ionic-angular';
import {PortfolioModal} from "./portfolio-modal/portfolio-modal";
import {MapModal} from "./map-modal/map-modal";
import {ShowBarcodeModal} from "./showbarcode-modal/showbarcode-modal";
import {WorkModal} from "./work-modal/work-modal";
import {AuthService} from "../../provider/auth";
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker} from 'ionic-native';

declare var firebase;

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  @ViewChild('mySlider') slider: Slides;
  @ViewChild('mySlider') pager;


  @ViewChild('profile') profile;

  @ViewChild('contact') contact;
  @ViewChild('portfolio') portfolio;
  @ViewChild('work') work;
  @ViewChild('social') social;

  TabArray = [
    "contact",
    "portfolio",
    "work",
    "social"
  ];

  mySlideOptions = {
    initialSlide: 1,
    loop: true
  };

  options;
  extraOptions;
  currentTab;

  loader;

  account;


  //MAKES IT SO THE COLOR OF THE BORDER-BOTOM OF THE TAB DOESN'T REPEAT WHEN THE VIEW ENTER BACK IN
  smallWorkAround1:number = 0;


  hiddenMap:boolean = false;
  map: GoogleMap;

  constructor(private navCtrl: NavController, private navParams : NavParams ,private modalCtrl: ModalController, private loadingCtrl : LoadingController, private auth: AuthService) {
    // event.preventDefault();

    this.account = this.navParams.get("ScannedUser");

  }


  ionViewDidEnter(){


    this.currentTab = this.contact;
    console.log(this.contact);
    if(this.smallWorkAround1 < 1){
      this.contact.nativeElement.style.borderBottom = "4px solid #B63A3A";
      this.smallWorkAround1++;
    }
    this.options = {
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true
    // paginationBulletRender: function (index, className) {
    // console.log(className);
    // console.log(this.categories);
    // return `<span class="${className}">${this.categories[index]}</span>`;
    // return `<!--<button class="${className}">${this.categories[index]}</button>-->`;
    // }
    };

    let takeAwayHide = this.pager.elementRef.nativeElement.children[0].children[1];
    takeAwayHide.className = "swiper-pagination";
    this.slider.getSlider().update()
  }

  ionViewLoaded(){

    if(!this.account){
      setTimeout(() => {
        this.loader = this.loadingCtrl.create(
          { content: "Please wait..." }
        );
        this.loader.present();
      }, 0);


      this.auth.getAccounts((data) => {
        setTimeout(() => {
          this.loader.dismiss();
        },0);
        this.account = data;
        console.log(this.account);
      });
    }else{
      console.log("************************************************************************************************************************");
      console.log(this.account);
      console.log("This page was set already because it was a scanned user. Not your profile");
    }
  }

  onSlidedChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.changeTabIndex(currentIndex);

  }

  testDrag(){
    let currentIndex = this.slider.getActiveIndex();
    this.changeTabIndex(currentIndex);

  }

  changeTabIndex(index){
    this.currentTab.nativeElement.style.borderBottom = "";
    let newTab = this.TabArray[index];
    this[newTab].nativeElement.style.borderBottom = "4px solid #B63A3A";
    this.currentTab = this[newTab];
  }

  openPortfolio(obj){
      console.log(obj);
      let modal = this.modalCtrl.create(PortfolioModal, {profile: obj});
      modal.onDidDismiss(() => {
        this.BackgroundOpacity(true);
      });
      this.BackgroundOpacity(false);
      modal.present();
  }

  BackgroundOpacity(value){
    if(value){
      this.profile.elementRef.nativeElement.setAttribute("style", "background-color: ;");
    }else{
      this.profile.elementRef.nativeElement.setAttribute("style", "opacity: 0.5;background-color: #363838;-webkit-filter: blur(5px);moz-filter: blur(5px);-o-filter: blur(5px);-ms-filter: blur(5px);filter: blur(5px);");
    }
  }

  openMap(){
    // let modal = this.modalCtrl.create(MapModal);
    // modal.onDidDismiss(() => {
    //   this.BackgroundOpacity(true);
    // });
    // this.BackgroundOpacity(false);
    // modal.present();
    this.hiddenMap = !this.hiddenMap;
    document.getElementsByClassName("show-tabbar")[0].className = "hide-tabbar";
    console.log("OPen Map");
    this.loadMap();
    // this.navCtrl.push(MapModal);
  }

  closeMap(){
    document.getElementsByClassName("hide-tabbar")[0].className = "show-tabbar";
    console.log("close Map");
    this.hiddenMap = !this.hiddenMap;
  }

  openBarcode(){
    let modal = this.modalCtrl.create(ShowBarcodeModal);
    modal.onDidDismiss(() => {
      this.BackgroundOpacity(true);
    });
    this.BackgroundOpacity(false);
    modal.present();
  }

  openWorkModal(obj){
    let modal = this.modalCtrl.create(WorkModal, {profile: obj});
    modal.onDidDismiss(() => {
      this.BackgroundOpacity(true);
    });
    this.BackgroundOpacity(false);
    modal.present();
  }

  loadMap(){

    let location = new GoogleMapsLatLng(39.0119020 , -98.4842460);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 180,
        'zoom': 5,
        'bearing': 50
      }
    });

    let myHome: GoogleMapsLatLng = new GoogleMapsLatLng(40.5888237,-74.4378557);

    let markerOptions: GoogleMapsMarkerOptions = {
      position: myHome,
      title: 'Test Home'
    };

    this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
      console.log(marker);
      marker.showInfoWindow();
    })

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

  openMapList(){

  }


}
