import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // Modal
  modalSample: BsModalRef
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-md'
  };

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }
  
  openModalSample(modalRef: TemplateRef<any>) {
    this.modalSample = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModalSample() {
    this.modalSample.hide()
  }

}
