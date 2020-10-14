import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  // Data
  totalCompanies: number = 0
  totalBusinessess: number = 0 
  totalLocal: number = 0
  totalForeign: number = 0
  totalSoleProprietorship: number = 0
  totalPartnership: number = 0

  // Image
  // slider1 = 'assets/img/carousel/landscape-1.jpg'
  // slider2 = 'assets/img/carousel/landscape-2.jpg'
  slider1 = 'assets/img/banner/banner portal-01.png'
  slider2 = 'assets/img/banner/banner portal-02.png'
  slider3 = 'assets/img/banner/banner portal-03.png'
  slider4 = 'assets/img/banner/banner portal-04.png'

  // Cookie consent
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(
    private router: Router,
    private ccService: NgcCookieConsentService,
    private statService: StatisticsService
  ) {
    this.getData()
  }

  ngOnInit(): void {
    this.initCookie()
  }

  getData() {
    this.statService.getAll().subscribe(
      (res) => {
        res.forEach(
          (item) => {
            if (item['slug'] == 'companies') {
              this.totalCompanies = item['value']
            }
            else if (item['slug'] == 'business') {
              this.totalBusinessess = item['value']
            }
            else if (item['slug'] == 'local') {
              this.totalLocal = item['value']
            }
            else if (item['slug'] == 'foreign') {
              this.totalForeign = item['value']
            }
            else if (item['slug'] == 'sole_proprietorshop') {
              this.totalSoleProprietorship = item['value']
            }
            else if (item['slug'] == 'partnership') {
              this.totalPartnership = item['value']
            }
          }
        )
      }
    )
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path])
  }

  initCookie() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

}
