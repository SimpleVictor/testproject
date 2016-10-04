import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Slides, ModalController} from 'ionic-angular';
import {PortfolioModal} from "./portfolio-modal/portfolio-modal";


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

  //MAKES IT SO THE COLOR OF THE BORDER-BOTOM OF THE TAB DOESN'T REPEAT WHEN THE VIEW ENTER BACK IN
  smallWorkAround1:number = 0;


  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {
  }

  ionViewDidEnter(){
    this.currentTab = this.contact;
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

  openPortfolio(){
      let modal = this.modalCtrl.create(PortfolioModal);
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

  testTouch(){
    console.log("touch star");
  }

  clickTouch(){
    console.log("cklicked");
  }
  touchEnd(){
    console.log("touched end")
  }


}
