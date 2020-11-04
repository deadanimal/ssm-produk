import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';

import * as moment from 'moment';
import swal from 'sweetalert2';
import Quill from 'quill';
import { BsModalRef, BsModalService, TabDirective } from 'ngx-bootstrap';
import { forkJoin } from 'rxjs';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';

@Component({
  selector: 'app-configuration-enquiry',
  templateUrl: './configuration-enquiry.component.html',
  styleUrls: ['./configuration-enquiry.component.scss']
})
export class ConfigurationEnquiryComponent implements OnInit {

  // Data
  eGovEmail: string
  generalEmail: string
  topicDropdowns: any[] = []
  subjectDropdowns: any[] = []
  selectedRow

  // Form
  eGovForm: FormGroup
  generalForm: FormGroup

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: 'modal-dialog-centered modal-lg',
  };

  // Dropdowns //

  topics: any[] = []
  subjects: any[] = []

  isTopic: boolean = false
  isSubject: boolean = false
  
  tableTopicEntries: number = 10
  tableTopicSelected: any[] = []
  tableTopicTemp = []
  tableTopicActiveRow: any
  tableTopicRows: any[] = []

  tableSubjectEntries: number = 10
  tableSubjectSelected: any[] = []
  tableSubjectTemp = []
  tableSubjectActiveRow: any
  tableSubjectRows: any[] = []

  topicForm: FormGroup
  subjectForm: FormGroup

  constructor(
    private ticketService: TicketsService,
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private modalService: BsModalService
  ) { 
    this.getData()
  }

  ngOnInit() {
    this.initForm()
    this.initQuill()
  }

  initForm() {
    this.eGovForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.topicForm = this.fb.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      active: new FormControl(true, Validators.compose([
        Validators.required
      ])),
      category: new FormControl('GN', Validators.compose([
        Validators.required
      ]))
    })

    this.subjectForm = this.fb.group({
      name: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      active: new FormControl(true, Validators.compose([
        Validators.required
      ])),
      topic: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
  }

  initQuill() {
    var quillInstructionEN = new Quill('#instructionEN',{
			modules: {
				toolbar: [
					['bold', 'italic'],
					['link', 'blockquote', 'code'],
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}]
				]
			},
			placeholder: 'Quill WYSIWYG',
			theme: 'snow'
    });
    
    var quillInstructionBM = new Quill('#instructionBM',{
			modules: {
				toolbar: [
					['bold', 'italic'],
					['link', 'blockquote', 'code'],
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}]
				]
			},
			placeholder: 'Quill WYSIWYG',
			theme: 'snow'
    });
    
    var quillDisclaimerEN = new Quill('#disclaimerEN',{
			modules: {
				toolbar: [
					['bold', 'italic'],
					['link', 'blockquote', 'code'],
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}]
				]
			},
			placeholder: 'Quill WYSIWYG',
			theme: 'snow'
    });
    
    var quillDisclaimerBM = new Quill('#disclaimerBM',{
			modules: {
				toolbar: [
					['bold', 'italic'],
					['link', 'blockquote', 'code'],
					[{
						'list': 'ordered'
					}, {
						'list': 'bullet'
					}]
				]
			},
			placeholder: 'Quill WYSIWYG',
			theme: 'snow'
		});
  }

  getData() {
    this.loadingBar.start()
    forkJoin([
      this.ticketService.getTopics(),
      this.ticketService.getSubjects()
    ]).subscribe(
      (res) => {
        this.loadingBar.complete()
        this.topics = res[0]
        this.subjects = res[1]
      },
      (fail) => {
        console.log(fail)
        this.loadingBar.complete()
      },
      () => {
        this.loadTable()
      }
    )
  }
  
  onSelectTab(data: TabDirective) {
    console.log(data['heading'])
    if (data['heading'] == 'Dropdown Editor') {
      this.isTopic = true
      this.isSubject = false
    }
    else {
      this.isTopic = false
      this.isSubject = false
    }
  }

  onSelectTabInside(data: TabDirective) {
    console.log(data['heading'])
    if (data['heading'] == 'Topic') {
      this.isTopic = true
      this.isSubject = false
    }
    else if (data['heading'] == 'Subject') {
      this.isTopic = false
      this.isSubject = true
    }
  }

  loadTable() {
    this.tableTopicRows = this.topics
    this.tableTopicTemp = this.tableTopicRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })

    this.tableSubjectRows = this.subjects
    this.tableSubjectTemp = this.tableSubjectRows.map((prop, key) => {
      return {
        ...prop,
        id_index: key+1
      };
    })
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );
  } 


  openModalUpdate(modalRef: TemplateRef<any>, row, type) {
    // console.log(row)
    this.selectedRow = row
    
    if (type == 'topic-update') {
      console.log(row.name)
      this.topicForm.controls['name'].setValue(row.name)
      this.topicForm.controls['active'].setValue(row.active)
      this.topicForm.controls['category'].setValue(row.category)
    }
    else if (type == 'subject-update') {
      this.subjectForm.controls['name'].setValue(row.name)
      this.subjectForm.controls['active'].setValue(row.active)
      
      for(let topic of this.topics) {
        if (topic.name == row.name) {
          this.subjectForm.controls['name'].setValue(topic.name)
          break;
        }
      }
    }
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );

  } 

  closeModal() {
    this.modal.hide()
    this.selectedRow = null
  }

  // Dropdown
  createTopic() {
    this.loadingBar.start()
    this.ticketService.createTopic(this.topicForm.value).subscribe(
      (res) => {
        console.log(res)
        this.loadingBar.complete()
      },
      (fail) => {
        console.log(fail)
        this.loadingBar.complete()
        this.closeModal() 
      },
      () => {
        this.getData()
        this.closeModal()
      }
    )
  }

  patchTopic() {
    this.loadingBar.start()
    this.ticketService.patchTopic(this.selectedRow.id, this.topicForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.getData()
        this.closeModal()
      }
    )
  }

  createSubject() {
    this.loadingBar.start()
    this.ticketService.createSubject(this.subjectForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.getData()
        this.closeModal()
      }
    )
  }

  patchSubject() {
    this.loadingBar.start()
    this.ticketService.patchTopic(this.selectedRow.id, this.subjectForm.value).subscribe(
      () => {
        this.loadingBar.complete()
      },
      () => {
        this.loadingBar.complete()
        this.closeModal()
      },
      () => {
        this.getData()
        this.closeModal()
      }
    )
  }

}
