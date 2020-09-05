import { Component, OnInit } from "@angular/core";
import Glide from "@glidejs/glide";
import { Autoplay } from '@glidejs/glide/dist/glide.modular.esm'
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing2',
  templateUrl: './landing2.component.html',
  styleUrls: ['./landing2.component.scss']
})
export class Landing2Component implements OnInit {

  focus
  public totalCompanies: number = 1360941;
  public totalBusinessess: number = 7810212;
  
  constructor(
    private router: Router
  ) {}

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {

    // Carousel
    new Glide('.glidez', {
      type: 'carousel',
      startAt: 0,
      focusAt: 2,
      perTouch: 1,
      perView: 4,
      autoplay: 2500
    }).mount({ Autoplay });

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("presentation-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.add("bg-primary");
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("presentation-page");
    var navbar = document.getElementById("navbar-main");
    navbar.classList.remove("bg-primary");
  }
  
  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path])
  }

}
