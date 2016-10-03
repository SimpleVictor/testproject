import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {

  @ViewChild('mySlider') slider: Slides;
  @ViewChild('mySlider') pager;

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

  constructor(private navCtrl: NavController) {

  }

  ionViewDidEnter(){
    this.currentTab = this.contact;
    this.contact.nativeElement.style.borderBottom = "4px solid #0177B5";
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

}
