import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BankService } from 'src/app/services/bank.service';
declare var $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  banks:any=[];
  states:any=[];
  districts:any=[];
  bank_name:string;
  bankData = [];

  // Form
  validations_form: FormGroup;
  validation_messages = {
    "branchName": [
      { type: 'required', message: 'branch Name is required.' }
    ],
    "ifscCode": [
      { type: 'required', message: 'IFSC is required.' }
    ],
    "bank": [
      { type: 'required', message: 'bank  Name is required.' }
    ],
    "state": [
      { type: 'required', message: 'state name is required.' }
    ],
    "district": [
      { type: 'required', message: 'district Name is required.' }
    ]
  };
  constructor(
    private bankService: BankService,
    public formBuilder: FormBuilder) { }

    // selectBank
    onSelectBank(e){
      this.validations_form.value.state = "";
      this.validations_form.value.district = "";

      this.states = [];
      this.districts = [];
      if(e && e != null && e!=="undefined"){
        this.states = [];
        this.districts = [];
        let filtered = this.filteredData(this.banks, e, 'bank');
        this.states = filtered.state;
      }
  }

  // selectStates
  onSelectState(e){
    this.validations_form.value.district = "";
    this.districts = [];
    if(e && e != null && e!=="undefined"){
      let filtered = this.filteredData(this.states, e, 'state');
      this.districts = filtered.district;
    }
  }
  // selectDistricts
  onSelectDistricts(e){
    if(e && e != null && e!=="undefined"){
      let filtered = this.filteredData(this.districts, e, 'district');
    }
  } 

  filteredData(array,val, str){
    let obj = array.find(function(item){ 
      if(str === "bank"){
        if (item.bank_name == val)
        { 
          return item; 
        } 
      }else{
        if(str === "state"){
          if (item.state_name == val)
          { 
            return item; 
          } 
        }else{
          if(str === "district"){
            if (item.district_name == val)
            { 
              return item; 
            } 
          }
        }
      }
     
    });
    return obj;
  }

  addBranch(event,values){
    if(!this.validations_form.valid){
      alert("Please fill all fields")
    }else{
      values['id']= this.bankService.create_UUID();
      this.bankData.push(values);
      localStorage.setItem('bank_tally', JSON.stringify(this.bankData));
      this.bankServicesData();
      $("#addBranchModal").modal("hide");
      this.validations_form.reset();
    }
  }

  bankServicesData(){
    let data = this.bankService.getBankServiceData();;
    if(data && data!=null && typeof(data) !== "undefined"){
      this.bankData =  data;
    }
  }

  delete(id){
    if(this.bankData && this.bankData.length){
      let index = this.bankData.findIndex(data=>data.id === id);
      this.bankData.splice(index,1);
      localStorage.setItem('bank_tally', JSON.stringify(this.bankData));
      this.bankServicesData();
    }
  }

  ngOnInit(): void {
    this.validations_form = this.formBuilder.group({
      branchName: new FormControl('', Validators.required),
      ifscCode: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
    });

    const self = this;
    this.bankService.bankData().subscribe(res=>{
      let response:any = res;
      self.banks = response.BankData;
    });
    self.bankServicesData();
  }



}
