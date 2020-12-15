import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/services/users/users.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';


@Component({
  selector: 'app-egov-home',
  templateUrl: './egov-home.component.html',
  styleUrls: ['./egov-home.component.scss']
})
export class EgovHomeComponent implements OnInit {

  // Data
  user: User
  modalname: ''
  mode: ''
  // Slider
  slider1 = 'assets/img/banner/banner portal-01.png';
  slider2 = 'assets/img/banner/banner portal-02.png';
  slider3 = 'assets/img/banner/banner portal-03.png';
  slider4 = 'assets/img/banner/banner portal-04.png';

   // Modal
   modal: BsModalRef;
   modalTemp: BsModalRef;
   modalConfig = {
     keyboard: true,
     class: 'modal-dialog-centered',
   };

  constructor(
    private userService: UsersService,
    private router: Router,
    private modalService: BsModalService,

  ) { 
    this.user = this.userService.currentUser
    // console.log(this.user)
  }

  ngOnInit(): void {
  }

  navigatePage(path: string) {
    // console.log('Path: ', path)
    // console.log('Package: ', this.user['egov_package'])
    if (
      path == '/products/search-egov' &&
      (
        this.user['egov_package'] == 3 ||
        this.user['egov_package'] == 4
      )
    ) {
      this.router.navigate(['/profile/egov'], { queryParams: { tab: 'request-doc' }});
    }
    else {
      this.router.navigate([path]);
    }
  }

  openModal(modalRef: TemplateRef<any>,name) {
    if (name != "ss"){
      this.modalname = name;
      this.modal = this.modalService.show(
        modalRef,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }else{
      this.modalTemp = this.modal;
      this.modal = this.modalService.show(
        modalRef,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }   
    
    
  }

  closeModal(flag) {
    if (flag != "ss"){
      this.modal.hide();
    }else{
      this.modal.hide();
      this.modal = this.modalTemp;
    }
    
    
    // this.editAppReqForm.reset();
  }

}
