import { Component, OnInit, TemplateRef } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ProductsService } from "src/app/shared/services/products/products.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductCartsService } from 'src/app/shared/services/product-carts/product-carts.service';
class Entity {
  name: string;
  registration_no: string;
}

@Component({
  selector: "app-product-listing",
  templateUrl: "./product-listing.component.html",
  styleUrls: ["./product-listing.component.scss"],
})
export class ProductListingComponent implements OnInit {

  // Data
  entity: any;
  products: any[] = [];

  // Checker
  isProceed: boolean = false;

  // Options
  ctcOpts = [
    { name: "non-CTC", value: "non-ctc" },
    { name: "CTC", value: "ctc" },
    { name: "Both", value: "both" },
  ];

  // Modal
  modalSample: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-md",
  };

  // Form
  searchForm: FormGroup

  cartForm: FormGroup

  constructor(
    private toastr: ToastrService,
    private productService: ProductsService,
    private modalService: BsModalService,
    private router: Router,
    private fb: FormBuilder,
    private cartService: ProductCartsService
  ) {
    this.entity = this.router.getCurrentNavigation().extras as any
    console.log(this.entity)
  }

  ngOnInit(): void {
    // this.entity = {
    //   name: "PIPELINE NETWORK SDN. BHD.",
    //   registration_no: "201101032401 (960536-K)",
    // };
    console.log(this.entity)

    this.searchForm = this.fb.group({
      name: new FormControl('getImageList'),
      registration_number: new FormControl('', Validators.compose([
        Validators.required
      ])),
      entity_type: new FormControl('ROB')
    })

    this.cartForm = this.fb.group({
      entity: new FormControl(''),
      entity_registration_number: new FormControl('', Validators.compose([
        Validators.required
      ])),
      product_type: new FormControl('f941af40-ba69-441c-ab93-e328101c192b')
    })

    if (this.entity) {
      this.checkImage()
    }
  }

  proceed() {
    this.isProceed = true;
  }

  addCart() {
    let title = "Success";
    let message = "Item is added to the cart";
    this.toastr.success(message, title);
    this.productService.cart = true;

    if (this.entity) {
      this.cartForm.controls['entity'].setValue(this.entity.name)
      this.cartForm.controls['entity_registration_number'].setValue(this.entity.company_number)
    }

    this.cartService.create(this.cartForm.value).subscribe(
      () => {},
      () => {},
      () => {}
    )

  }

  openModalSample(modalRef: TemplateRef<any>) {
    this.modalSample = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModalSample() {
    this.modalSample.hide();
  }

  checkImage() {
    let reg = this.entity.registration_number + '-' + this.entity.check_digit
    if (this.entity) {
      this.searchForm.controls['registration_number'].setValue('1097967-P')
    }
    console.log(this.searchForm.value)
    this.productService.search(this.searchForm.value).subscribe()
  }
}
