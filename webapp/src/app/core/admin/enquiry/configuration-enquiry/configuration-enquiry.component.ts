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

  @ViewChild('headerEN', {
    static: true
  }) headerEN: QuillViewHTMLComponent
  @ViewChild('headerBM', {
    static: true
  }) headerBM: QuillViewHTMLComponent
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
  @ViewChild('headerNotesEN', {
    static: true
  }) headerNotesEN: QuillViewHTMLComponent
  @ViewChild('headerNotesBM', {
    static: true
  }) headerNotesBM: QuillViewHTMLComponent
  @ViewChild('bodyNotesEN', {
    static: true
  }) bodyNotesEN: QuillViewHTMLComponent
  @ViewChild('bodyNotesBM', {
    static: true
  }) bodyNotesBM: QuillViewHTMLComponent

  headerInstructionENForm: FormGroup
  headerInstructionBMForm: FormGroup
  bodyInstructionENForm: FormGroup
  bodyInstructionBMForm: FormGroup
  headerDisclaimerENForm: FormGroup
  headerDisclaimerBMForm: FormGroup
  bodyDisclaimerENForm: FormGroup
  bodyDisclaimerBMForm: FormGroup
  headerNotesENForm: FormGroup
  headerNotesBMForm: FormGroup
  bodyNotesENForm: FormGroup
  bodyNotesBMForm: FormGroup

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

    this.headerInstructionENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
    this.headerInstructionBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.bodyInstructionENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.bodyInstructionBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.headerDisclaimerENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.headerDisclaimerBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })
    this.bodyDisclaimerENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.bodyDisclaimerBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.headerNotesENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.headerNotesBMForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.bodyNotesENForm = this.fb.group({
      id: new FormControl(null, Validators.compose([
        Validators.required
      ])),
      description: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    })

    this.bodyNotesBMForm = this.fb.group({
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
          if (note['slug'] == 'header_instruction_en') {
            console.log(note)
            this.headerInstructionENForm.controls['description'].setValue(note['description'])
            this.headerInstructionENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'header_instruction_bm') {
            console.log(note)
            this.headerInstructionBMForm.controls['description'].setValue(note['description'])
            this.headerInstructionBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'instruction_en') {
            console.log(note)
            this.bodyInstructionENForm.controls['description'].setValue(note['description'])
            this.bodyInstructionENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'instruction_bm') {
            this.bodyInstructionBMForm.controls['description'].setValue(note['description'])
            this.bodyInstructionBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'header_disclaimer_en') {
            this.headerDisclaimerENForm.controls['description'].setValue(note['description'])
            this.headerDisclaimerENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'header_disclaimer_bm') {
            this.headerDisclaimerBMForm.controls['description'].setValue(note['description'])
            this.headerDisclaimerBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'disclaimer_en') {
            this.bodyDisclaimerENForm.controls['description'].setValue(note['description'])
            this.bodyDisclaimerENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'disclaimer_bm') {
            this.bodyDisclaimerBMForm.controls['description'].setValue(note['description'])
            this.bodyDisclaimerBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'header_notes_en') {
            this.headerNotesENForm.controls['description'].setValue(note['description'])
            this.headerNotesENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'header_notes_bm') {
            this.headerNotesBMForm.controls['description'].setValue(note['description'])
            this.headerNotesBMForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'notes_en') {
            this.bodyNotesENForm.controls['description'].setValue(note['description'])
            this.bodyNotesENForm.controls['id'].setValue(note['id'])
          }
          else if (note['slug'] == 'notes_bm') {
            this.bodyNotesBMForm.controls['description'].setValue(note['description'])
            this.bodyNotesBMForm.controls['id'].setValue(note['id'])
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

    if (noteType == 'header-en'){
      noteBody = this.headerInstructionENForm.value
      console.log(noteBody)
    }
    else if (noteType == 'header-bm'){
      noteBody = this.headerInstructionBMForm.value
    }
    else if (noteType == 'instruction-en') {
      noteBody = this.bodyInstructionENForm.value
      console.log(noteBody)
    }
    else if (noteType == 'instruction-bm') {
      noteBody = this.bodyInstructionBMForm.value
    }
    else if (noteType == 'header-disclaimer-en') {
      noteBody = this.headerDisclaimerENForm.value
    }
    else if (noteType == 'header-disclaimer-bm') {
      noteBody = this.headerDisclaimerBMForm.value
    }
    else if (noteType == 'body-disclaimer-en') {
      noteBody = this.bodyDisclaimerENForm.value
    }
    else if (noteType == 'body-disclaimer-bm') {
      noteBody = this.bodyDisclaimerBMForm.value
    }
    else if (noteType == 'header-notes-en') {
      noteBody = this.headerNotesENForm.value
    }
    else if (noteType == 'header-notes-bm') {
      noteBody = this.headerNotesBMForm.value
    }
    else if (noteType == 'body-notes-en') {
      noteBody = this.bodyNotesENForm.value
    }
    else if (noteType == 'body-notes-bm') {
      noteBody = this.bodyNotesBMForm.value
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
