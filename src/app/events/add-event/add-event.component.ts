import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { EventsService } from '../shared/events.service';
import { Router } from '@angular/router';
import { Event } from '../shared/event.class';
import { GlobalService } from '../../core/global.service';
import { User } from './../../user/shared/user.class';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  addEventForm: FormGroup;
  user: User;
  selectedImage: string = '../../assets/placeholder.gif';

  titleMessage: string;
  dtStartMessage: string;
  dtEndMessage: string;
  dtGroupMessage: string;
  descriptionMessage: string;
  capacityMessage: string;

  validationMessages = {
    required: 'This input is required',
    minlength: 'Enter at least 10 characters',
    notANumber: 'This is not a number',
    startDate: "Start date can't be in the past",
    endDate: "Start date can't be after the end date"
  }

  constructor(private formBuilder: FormBuilder,
    private eventsService: EventsService,
    private router: Router,
    private global: GlobalService) { }

  ngOnInit() {
    this.global.getUser().subscribe(val => {
      this.user = val;
    });
    this.initializeAddEventForm();
    this.checkValidationMessages();
  }

  checkValidationMessages() {
    const title = this.addEventForm.get('title');
    title.valueChanges.subscribe(value => {
      this.titleMessage = this.setMessage(title)[0];
    });
    const dtStart = this.addEventForm.get('dateGroup').get('dtStart');
    dtStart.valueChanges.subscribe(val => {
      this.dtStartMessage = this.setMessage(dtStart)[0];
    });
    const dtEnd = this.addEventForm.get('dateGroup').get('dtEnd');
    dtEnd.valueChanges.subscribe(val => {
      this.dtEndMessage = this.setMessage(dtEnd)[0];
    });
    const dtGroup = this.addEventForm.get('dateGroup');
    dtGroup.valueChanges.subscribe(val => {
      this.dtEndMessage = this.setMessage(dtGroup)[0];
    });
    const description = this.addEventForm.get('description');
    description.valueChanges.subscribe(val => {
      this.descriptionMessage = this.setMessage(description)[0];
    });
    const capacity = this.addEventForm.get('capacity');
    capacity.valueChanges.subscribe(val => {
      this.capacityMessage = this.setMessage(capacity)[0];
    });
  }

  setMessage(c: AbstractControl): Array<string> {
    let messages = [];
    if ((c.dirty || c.touched) && c.errors) {
      Object.keys(c.errors).map(key => {
        if (this.validationMessages[key])
          messages.push(this.validationMessages[key]);
      });
    }
    return messages;
  }

  initializeAddEventForm() {
    this.addEventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      dateGroup: this.formBuilder.group({
        dtStart: ['', [Validators.required, this.compareDates()]],
        dtEnd: ['', [Validators.required]],
      }, { validator: this.compareDates("dtStart", "dtEnd") }),
      description: ['', [Validators.required, Validators.minLength(10)]],
      capacity: ['', [Validators.required, this.isNumber]]
    })
  }

  compareDates(startControlName?: string, endControlName?: string): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (endControlName) {
        let dtStart: number = new Date(c.get(startControlName).value).valueOf();
        let dtEnd: number = new Date(c.get(endControlName).value).valueOf();
        if (dtStart < new Date().valueOf() - 60000) {
          return { 'startDate': true };
        }
        if (dtStart > dtEnd) {
          c.get(endControlName).setErrors({ 'dateValidation': true });
          return { 'endDate': true };
        }
      }

      else {
        let dtStart: number = new Date(c.value).valueOf();
        if (dtStart < new Date().valueOf() - 60000) {
          return { 'startDate': true };
        }
      }
      return null;
    }
  }


  isNumber(c: AbstractControl): { [key: string]: boolean } | null {
    if (isNaN(c.value))
      return { 'notANumber': true }
    return null;
  }

  addEvent(): void {
    let event = this.returnEventObjectFromAddEventForm();
    this.eventsService.addEvent(event)
      .then(data => this.router.navigate(['/events']))
      .catch(err => console.log(err));
  }

  returnEventObjectFromAddEventForm(): Event {

    return new Event(

      this.addEventForm.get('title').value,
      this.addEventForm.get('dateGroup.dtStart').value.toString(),
      this.addEventForm.get('dateGroup.dtEnd').value.toString(),
      this.addEventForm.get('description').value,
      this.addEventForm.get('capacity').value,
      this.user.key,
      this.selectedImage

    )
  }

  onImageUpload(event: any): void {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0])
    fileReader.onload = () => {
      this.selectedImage = fileReader.result.toString();
    }
  }

}

