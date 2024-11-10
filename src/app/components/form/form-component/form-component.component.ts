import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent {
  constructor(private fb: FormBuilder, private service: ApiserviceService) {
  }
  
  FormData: any
  isUpdate : boolean = false
  alert: Boolean = false
  isSubmit: boolean = true
  class: string = ''
  alertMessage: string = ''
  submitClick : boolean =false

  ngOnInit() {
    this.FormData = this.fb.group({
      class: ['', Validators.required],
      fullname: ['', Validators.required],
      lname: ['', Validators.required],
      Age: ['', Validators.required]
    })

    if (this.service.Datastore.length !== 0) {
      this.isUpdate = true
      this.isSubmit = false
      this.FormData.patchValue({
        class: this.service.Datastore.class,
        fullname: this.service.Datastore.fullname,
        lname: this.service.Datastore.lname,
        Age: this.service.Datastore.Age

      })
    }
  }
  submitData() {
    if (this.FormData.valid) {
      this.service.AddData(this.FormData.value).subscribe(res => {
        this.class = 'alert-info'
        this.alertMessage = 'Data submitted'
        this.alertFlicker()
        this.FormData.reset()
      }, (error) => {
        this.class = 'alert-danger'
        this.alertMessage = 'Error Occures TryAgain..'
        this.alertFlicker()
      })
    }else{
      this.class = 'alert-info'
      this.alertMessage = 'Please enter a valid details.'
      this.alertFlicker()
      this.submitClick = true
    }
  }
  
  updateData() {
    if (this.FormData.valid) {
      this.service.updateData(this.service.Datastore.id, this.FormData.value).subscribe(res => {
        this.class = 'alert-info'
        this.alertMessage = 'Data updated..'
        this.alertFlicker()
        this.service.Datastore = []
        this.isUpdate = false
        this.FormData.reset()
        this.isSubmit = true
        this.isUpdate = false
      }, err =>{
        this.class = 'alert-danger'
        this.alertMessage = 'something went wrong..'
        this.alertFlicker()
      });
    }
  }


  alertFlicker() {
    this.alert = true
    setTimeout(() => {
      this.alert = false
    }, 2000);
  }
}
