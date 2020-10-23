import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-search-egov-pi',
  templateUrl: './product-search-egov-pi.component.html',
  styleUrls: ['./product-search-egov-pi.component.scss']
})
export class ProductSearchEgovPiComponent implements OnInit {

  // Form
  focus
  clicked
  requestForm: FormGroup
  cartForm: FormGroup

  // Data
  requestToAdd: any[] = []


  constructor(
    private fb: FormBuilder
  ) { 
    this.initForm()
  }

  ngOnInit(): void {
  }

  initForm() {
    this.requestForm = this.fb.group({
      id_type: new FormControl(''),
      id_value: new FormControl(''),
      entity_type: new FormControl(''),
      involvement_information: new FormControl(''),
      language: new FormControl('BM'),
      ctc: new FormControl(false)
    })
  }

  addRequest() {

  }

  remove() {

  }

  submit() {

  }

  showSummary() {}

}
