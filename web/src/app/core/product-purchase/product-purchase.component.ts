import { Component, OnInit } from '@angular/core';
import { Outfit } from 'src/app/shared/services/outfits/outfits.model';
import { OutfitsService } from 'src/app/shared/services/outfits/outfits.service';

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss']
})
export class ProductPurchaseComponent implements OnInit {

  // Data
  outfits: Outfit[] = []

  constructor(
    private outfitService: OutfitsService
  ) { }

  ngOnInit(): void {
    this.outfitService.getAll().subscribe(
      () => {
        this.outfits = this.outfitService.outfits
      }
    )
  }

}
