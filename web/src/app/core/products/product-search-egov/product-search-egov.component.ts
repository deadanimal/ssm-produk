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

// user service
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { EntitiesService } from 'src/app/shared/services/entities/entities.service';
import { User } from 'src/app/shared/services/users/users.model';
import { LoadingBarService } from '@ngx-loading-bar/core';

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
  outfits: any[] = [];

  // Table
  tableEntries: number = 10;
  tableSelected: any[] = [];
  tableTemp = [];
  tableActiveRow: any;
  tableRows: any[] = [];
  SelectionType = SelectionType;

  // Search field
  focus;
  searchField: string = '';
  searchResult: any[] = [];
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

  user: User

  // slider
  slider1 = 'assets/img/banner/banner portal-01.png';
  slider2 = 'assets/img/banner/banner portal-02.png';
  slider3 = 'assets/img/banner/banner portal-03.png';
  slider4 = 'assets/img/banner/banner portal-04.png';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductsService,
    private spinner: NgxSpinnerService,
    private UsersService: UsersService,
    private AuthService: AuthService,
    private entityService: EntitiesService,
    private loadingBar: LoadingBarService
  ) {
    this.getUser()
  }

  ngOnInit(): void {


    this.initForms()
    // this.initData()
  }

  getUser() {
    this.user = this.UsersService.currentUser
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
    this.entityService.getAll().subscribe(
      () => {
        this.outfits = this.entityService.entities;
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

  navigatePage(selectedEntity) {
    let extras = selectedEntity
    if (this.user.egov_package == 1) {
      return this.router.navigate(['/products/search-result-package1'], extras);
    }
    else if (this.user.egov_package == 2) {
      return this.router.navigate(['/products/search-result-package2'], extras);
    }
    else if (this.user.egov_package == 3) {
      return this.router.navigate(['/products/search-result-package3'], extras);
    }
    else if (this.user.egov_package == 4) {
      return this.router.navigate(['/products/search-result-package4'], extras);
    }
    
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
    // this.spinner.show()
    let val = $event.target.value

    if (val.length == 0) {
      this.isEmpty = true
      this.isGotResult = false
    }
    else if (val.length >= 3) {
      this.loadingBar.useRef('http').start()
      this.entityService.query(val).subscribe(
        () => {
          // this.spinner.hide()
          this.tableRows = this.entityService.entitiesQuery
          this.loadingBar.useRef('http').complete()
        },
        () => {
          // this.spinner.hide()
          this.loadingBar.useRef('http').complete()
          this.error()
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
  
          if (this.tableTemp.length == 0) {
            this.isEmpty = true
            this.isGotResult = false
            this.error()
          }
          else {
            this.isEmpty = false
            this.isGotResult = true
            this.filterTable()
          }
        }
      )
    }
  }

  entriesChange($event) {
    this.tableEntries = $event.target.value;
  }

  filterTable() {
    let val = this.searchEntityType.toLowerCase();
    // console.log(val)

    if (this.searchEntityType == 'AL') {
      this.tableTemp = this.tableRows
    }
    else if (this.searchEntityType == 'AD') {
      this.tableTemp = this.tableRows.filter(function(d) {
        return d.type_of_entity.toLowerCase().indexOf(val) !== -1 || !val;
      })
    }
    else if (this.searchEntityType == 'BS') {
      this.tableTemp = this.tableRows.filter(function(d) {
        return d.type_of_entity.toLowerCase().indexOf(val) !== -1 || !val;
      })
    }
    else if (this.searchEntityType == 'CP') {
      this.tableTemp = this.tableRows.filter(function(d) {
        return d.type_of_entity.toLowerCase().indexOf(val) !== -1 || !val;
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

  error() {
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
    })
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
