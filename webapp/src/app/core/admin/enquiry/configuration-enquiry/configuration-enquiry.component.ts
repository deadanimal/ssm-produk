import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';

import * as moment from 'moment';
import swal from 'sweetalert2';
import Quill from 'quill';
import { BsModalRef, BsModalService, TabDirective } from 'ngx-bootstrap';
import { forkJoin } from 'rxjs';
import { TicketsService } from 'src/app/shared/services/tickets/tickets.service';
import { Note } from 'src/app/shared/services/tickets/tickets.model';
import { QuillViewHTMLComponent } from 'ngx-quill';

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

  // Instructions & disclaimers
  notes: Note[] = []

  @ViewChild('instructionEN', {
    static: true
  }) instructionEN: QuillViewHTMLComponent
  @ViewChild('instructionBM', {
    static: true
  }) instructionBM: QuillViewHTMLComponent
  @ViewChild('disclaimerEN', {
    static: true
  }) disclaimerEN: QuillViewHTMLComponent
  @ViewChild('disclaimerBM', {
    static: true
  }) disclaimerBM: QuillViewHTMLComponent
  @ViewChild('notesEN', {
    static: true
  }) notesEN: QuillViewHTMLComponent
  @ViewChild('notesBM', {
    static: true
  }) notesBM: QuillViewHTMLComponent

  instructionENForm: FormGroup
  instructionBMForm: FormGroup
  disclaimerENForm: FormGroup
  disclaimerBMForm: FormGroup
  notesENForm: FormGroup
  notesBMForm: FormGroup

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
    // this.initQuill()
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

    this.instructionENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.instructionBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.disclaimerENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.disclaimerBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.notesENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.notesBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.topicForm = this.fb.group({
      name_en: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      name_bm: new FormControl(null, Validators.compose([
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
      name_en: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      name_bm: new FormControl(null, Validators.compose([
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

  entriesChange($event, type) {
    if (type == 'topic') {
      this.tableTopicEntries = $event.target.value;
    }
    else if (type == 'subject') {
      this.tableSubjectEntries = $event.target.value;
    }
  }

  // initQuill() {
  //   var quillInstructionEN = new Quill('#instructionEN',{
	// 		modules: {
	// 			toolbar: [
	// 				['bold', 'italic'],
	// 				['link', 'blockquote', 'code'],
	// 				[{
	// 					'list': 'ordered'
	// 				}, {
	// 					'list': 'bullet'
	// 				}]
	// 			]
	// 		},
	// 		placeholder: 'Quill WYSIWYG',
	// 		theme: 'snow'
  //   });
    
  //   var quillInstructionBM = new Quill('#instructionBM',{
	// 		modules: {
	// 			toolbar: [
	// 				['bold', 'italic'],
	// 				['link', 'blockquote', 'code'],
	// 				[{
	// 					'list': 'ordered'
	// 				}, {
	// 					'list': 'bullet'
	// 				}]
	// 			]
	// 		},
	// 		placeholder: 'Quill WYSIWYG',
	// 		theme: 'snow'
  //   });
    
  //   var quillDisclaimerEN = new Quill('#disclaimerEN',{
	// 		modules: {
	// 			toolbar: [
	// 				['bold', 'italic'],
	// 				['link', 'blockquote', 'code'],
	// 				[{
	// 					'list': 'ordered'
	// 				}, {
	// 					'list': 'bullet'
	// 				}]
	// 			]
	// 		},
	// 		placeholder: 'Quill WYSIWYG',
	// 		theme: 'snow'
  //   });
    
  //   var quillDisclaimerBM = new Quill('#disclaimerBM',{
	// 		modules: {
	// 			toolbar: [
	// 				['bold', 'italic'],
	// 				['link', 'blockquote', 'code'],
	// 				[{
	// 					'list': 'ordered'
	// 				}, {
	// 					'list': 'bullet'
	// 				}]
	// 			]
	// 		},
	// 		placeholder: 'Quill WYSIWYG',
	// 		theme: 'snow'
	// 	});
  // }

  getData() {
    this.loadingBar.start()
    forkJoin([
      this.ticketService.getTopics(),
      this.ticketService.getSubjects(),
      this.ticketService.getNotes()
    ]).subscribe(
      (res) => {
        this.loadingBar.complete()
        this.topics = res[0]
        this.subjects = res[1]
        this.notes = res[2]
        // console.log(this.subjects)
      },
      (fail) => {
        console.log(fail)
        this.loadingBar.complete()
      },
      () => {
        this.loadTable()

        // console.log(this.notes)
        for(let note of this.notes) {
          // console.log(note)
          if (note['slug'] == 'instruction_en') {
            console.log(note)
            this.instructionENForm.controls['description'].setValue(note['description'])
            this.instructionENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'instruction_bm') {
            this.instructionBMForm.controls['description'].setValue(note['description'])
            this.instructionBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'disclaimer_en') {
            this.disclaimerENForm.controls['description'].setValue(note['description'])
            this.disclaimerENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'disclaimer_bm') {
            this.disclaimerBMForm.controls['description'].setValue(note['description'])
            this.disclaimerBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'notes_en') {
            this.notesENForm.controls['description'].setValue(note['description'])
            this.notesENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'notes_bm') {
            this.notesBMForm.controls['description'].setValue(note['description'])
            this.notesBMForm.controls['id'].setValue(note['id'])
          }
        }
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
      this.topicForm.controls['name_en'].setValue(row.name_en)
      this.topicForm.controls['name_bm'].setValue(row.name_bm)
      this.topicForm.controls['active'].setValue(row.active)
      this.topicForm.controls['category'].setValue(row.category)
    }
    else if (type == 'subject-update') {
      this.subjectForm.controls['name_en'].setValue(row.name_en)
      this.subjectForm.controls['name_bm'].setValue(row.name_bm)
      this.subjectForm.controls['active'].setValue(row.active)
      this.subjectForm.controls['topic'].setValue(row.topic.id)
    }
    this.modal = this.modalService.show(
      modalRef, this.modalConfig
    );

  } 

  closeModal() {
    this.modal.hide()
    this.selectedRow = null
  }

  // Instruction & Disclaimer
  patchNote(noteType: any) {
    let noteBody = {}

    if (noteType == 'instruction-en') {
      noteBody = this.instructionENForm.value
      console.log(noteBody)
    }
    else if (noteType == 'instruction-bm') {
      noteBody = this.instructionBMForm.value
    }
    else if (noteType == 'disclaimer-en') {
      noteBody = this.disclaimerENForm.value
    }
    else if (noteType == 'disclaimer-bm') {
      noteBody = this.disclaimerBMForm.value
    }
    else if (noteType == 'notes-en') {
      noteBody = this.notesENForm.value
    }
    else if (noteType == 'notes-bm') {
      noteBody = this.notesBMForm.value
    }

    this.loadingBar.start()
    this.ticketService.patchNote(noteBody['id'], noteBody).subscribe(
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
    this.ticketService.patchSubject(this.selectedRow.id, this.subjectForm.value).subscribe(
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
