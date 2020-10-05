import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { ProductsService } from 'src/app/shared/services/products/products.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Outfit } from 'src/app/shared/services/outfits/outfits.model';
import { OutfitsService } from 'src/app/shared/services/outfits/outfits.service';

// user service
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EntitiesService } from 'src/app/shared/services/entities/entities.service';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-search-egov',
  templateUrl: './product-search-egov.component.html',
  styleUrls: ['./product-search-egov.component.scss']
})
export class ProductSearchEgovComponent implements OnInit {

  // Data
  outfits: Outfit[] = [];

  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: Outfit[] = [];
  SelectionType = SelectionType;

  // Search field
  focus;
  searchField: string = '';
  searchResult: Outfit[] = [];
  searchEntityType: string = 'all'

  // Checker
  isEmpty = true;
  isNoResult = false;
  isGotResult = false;
  showIcondiv = true;

  // Form
  productForm: FormGroup;
  newIdentityForm: FormGroup;

  // Data
  searchResults: any[] = [];
  pdfProduct: any;

  // slider
  slider1 = 'assets/img/banner/banner portal-01.png';
  slider2 = 'assets/img/banner/banner portal-02.png';
  slider3 = 'assets/img/banner/banner portal-03.png';
  slider4 = 'assets/img/banner/banner portal-04.png';

  /// hardcode user
  userType: String;
  userID: String;
  userdetails: any;
  user_type = 'PB';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
    private UsersService: UsersService,
    private outfitService: OutfitsService,
    private AuthService: AuthService,
    private entityService: EntitiesService
  ) {}

  ngOnInit(): void {
    if (this.AuthService.userID != undefined) {
      this.userType = this.AuthService.userType;
      this.userID = this.AuthService.userID;

      this.UsersService.getOne(this.userID).subscribe((res) => {
        this.userdetails = res;
        this.user_type = this.userdetails.user_type;
        if (this.userdetails.user_type == 'EG') {
          this.showIcondiv == false;
        }
        // console.log('se = ', this.userdetails);
        // console.log('Svc: ', this.tableRows);
      });
    }

    this.initForms()
    // this.initData()
  }

  initForms() {
    this.productForm = this.fb.group({
      name: new FormControl('getCompProfile'),
      registration_number: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });

    this.newIdentityForm = this.fb.group({
      name: new FormControl('getNewFormatEntity'),
      registration_number: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  initData() {
    this.outfitService.getAll().subscribe(
      () => {
        this.outfits = this.outfitService.outfits;
        this.tableRows = this.outfits
        console.log(this.tableRows)
      },
      () => {},
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });
        console.log(this.tableTemp)
      }
    );
  }

  navigatePage(path: string, selectedEntity) {
    // console.log('Path: ', path)
    let extras = selectedEntity
    this.router.navigate([path], extras);
  }

  search() {
    // this.isEmpty = false
    // this.isGotResult = true
    
    this.spinner.show()
    // console.log(this.tableTemp.length)
    setTimeout(() => {
      this.spinner.hide()
      if (this.tableTemp.length >= 1) {
        this.isEmpty = false
        this.isGotResult = true
      }
      else {
        this.showAlertNotFound()
      }
    }, 2000)
  }

  viewResult() {
    console.log('View result');
    this.router.navigate(['/product-listing']);
  }

  query($event) {
///////!!!!!!!!!!!!!!
    /// 3 digit and above = ROC 
    
    // this.spinner.show()
    let val = $event.target.value
    this.entityService.query(val).subscribe(
      () => {
        // this.spinner.hide()
        this.tableRows = this.entityService.entitiesQuery
      },
      () => {
        // this.spinner.hide()
        this.showAlertNotFound()
        this.isEmpty = true
        this.isGotResult = false
      },
      () => {
        this.tableTemp = this.tableRows.map((prop, key) => {
          return {
            ...prop,
            id_index: key+1
          };
        });
        // console.log(this.tableTemp.length)

        if (this.tableTemp.length > 0) {
          this.isEmpty = false
          this.isGotResult = true
        }
        else {
          this.isEmpty = true
          this.isGotResult = false
          this.showAlertNotFound()
        }
      }
    )
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value.toLowerCase();
    this.tableTemp = this.tableRows.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    if (this.searchEntityType == 'all') {
      this.tableTemp = this.tableRows.filter(function(d) {
        // console.log(d.type_of_entity)
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
      })
    }
    else if (this.searchEntityType == 'AD') {
      this.tableTemp = this.tableRows.filter(function(d) {
        if (d.type_of_entity == 'AD') {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        }
      })
    }
    else if (this.searchEntityType == 'BS') {
      this.tableTemp = this.tableRows.filter(function(d) {
        if (d.type_of_entity == 'BS') {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        }
      })
    }
    else if (this.searchEntityType == 'CP') {
      this.tableTemp = this.tableRows.filter(function(d) {
        if (d.type_of_entity == 'CP') {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        }
      })
    }
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  onActivate(event) {
    this.tableActiveRow = event.row;
  }

  export() {
    this.showAlertSuccessExport()
  }

  showAlertNotFound() {
    swal.fire({
      title: 'Warning',
      text:
        'No entites found. For further search please insert company / business number without check digit and choose the entity type company / business from the dropdown list search box.',
      icon: 'warning',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        cancelButton: 'btn btn-outline-warning ',
        confirmButton: 'btn btn-warning ',
      },
    });
  }

  showAlertSuccessExport() {
    swal.fire({
      title: 'Success',
      text: 'Successfully export file.',
      icon: 'success',
      // showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Close',
      customClass: {
        cancelButton: 'btn btn-outline-success ',
        confirmButton: 'btn btn-success ',
      },
    });
  }

}
