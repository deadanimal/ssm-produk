import {
  Component,
  OnInit
} from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

import { LoadingBarService } from '@ngx-loading-bar/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { EntitiesService } from 'src/app/shared/services/entities/entities.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

import { Entity } from 'src/app/shared/services/entities/entities.model';

export enum SelectionType {
  single = 'single',
  multi = 'multi',
  multiClick = 'multiClick',
  cell = 'cell',
  checkbox = 'checkbox',
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  // Table
  tableEntries: number = 10
  tableSelected: any[] = []
  tableTemp = []
  tableActiveRow: any
  tableRows: Entity[] = []
  SelectionType = SelectionType

  // Search field
  focus
  searchEntityType: string = 'AL'

  // Checker
  isEmpty = true
  isNoResult = false
  isGotResult = false

  // Slider
  slider1 = 'assets/img/banner/banner portal-01.png'
  slider2 = 'assets/img/banner/banner portal-02.png'
  slider3 = 'assets/img/banner/banner portal-03.png'
  slider4 = 'assets/img/banner/banner portal-04.png'

  constructor(
    private entityService: EntitiesService,
    private productService: ProductsService,
    private loadingBar: LoadingBarService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void { }

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
              id_index: key + 1
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
      this.tableTemp = this.tableRows.filter(function (d) {
        return d.type_of_entity.toLowerCase().indexOf(val) !== -1 || !val;
      })
    }
    else if (this.searchEntityType == 'BS') {
      this.tableTemp = this.tableRows.filter(function (d) {
        return d.type_of_entity.toLowerCase().indexOf(val) !== -1 || !val;
      })
    }
    else if (this.searchEntityType == 'CP') {
      this.tableTemp = this.tableRows.filter(function (d) {
        return d.type_of_entity.toLowerCase().indexOf(val) !== -1 || !val;
      })
    }
  }

  onSelect({ selected }) {
    this.tableSelected.splice(0, this.tableSelected.length);
    this.tableSelected.push(...selected);
  }

  navigateItem(path: string, selectedEntity) {
    // console.log('Path: ', path)
    // console.log(selectedEntity)
    let registration_no = ''
    if (selectedEntity.type_of_entity == 'CP') {
      registration_no = selectedEntity.company_number
    }
    else if (selectedEntity.type_of_entity == 'BS') {
      registration_no = selectedEntity.registration_number
    }
    else if (selectedEntity.type_of_entity == 'AD') {
      registration_no = selectedEntity.audit_firm_number
    }
    let availabilityBody = {
      'registration_no': registration_no,
      'entity_type': 'ROC'
    }

    this.loadingBar.useRef('http').start()
    this.productService.checkAvailability(availabilityBody).subscribe(
      (res) => {
        let extras = {
          'entity': selectedEntity,
          'availability': res
        }
        this.loadingBar.useRef('http').complete()
        this.router.navigate([path], extras as any);
      },
      () => {
        this.loadingBar.useRef('http').complete()
      }
    )


  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    this.router.navigate([path]);
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
