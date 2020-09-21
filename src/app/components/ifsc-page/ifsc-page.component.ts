import { Component, OnInit, Input } from '@angular/core';
import { BankService } from 'src/app/services/bank.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ifsc-page',
  templateUrl: './ifsc-page.component.html',
  styleUrls: ['./ifsc-page.component.css']
})
export class IfscPageComponent implements OnInit {
  bankData= [];
  groupByBanks:any;
  groupByStates:any;
  groupByDistrict:any;
  groupByBranch:any;
  banks:any = [];
  states:any = [];
  districts:any = [];
  branchs:any = [];
  submitForm:boolean = false;
  result:any;

  // Form
  validations_form: FormGroup;
  validation_messages = {
    "bankName": [
      { type: 'required', message: 'Bank Name is required.' }
    ],
    "stateName": [
      { type: 'required', message: 'State Name is required.' }
    ],
    "districtName": [
      { type: 'required', message: 'District  Name is required.' }
    ],
    "branchName": [
      { type: 'required', message: 'Branch Name is required.' }
    ]
  };

  constructor(
    private bankService: BankService,
    public formBuilder: FormBuilder) { }

  bankServicesData(){
    let data = this.bankService.getBankServiceData();;
    if(data && data!=null && typeof(data) !== "undefined"){
      this.bankData =  data;
      this.groupByBanks = this.groupByAuto(data, "bank")
      this.banks = Object.keys(this.groupByBanks);
    }
  }

  groupByAuto(data, key){
    var groups={};
    for(var i in data){
        if(!groups.hasOwnProperty(data[i][key])) groups[data[i][key]]=[];
        groups[data[i][key]].push(data[i]);
    }
    return groups;
  }

  onSelectBank(e){
    this.states = [];
    this.districts = [];
    this.branchs = [];
    this.validations_form.value.stateName = '';
    this.validations_form.value.districtName  = '';
    this.validations_form.value.branchName = '';

    if(e && e!=null && e!=="undefined"){      
      const bank_Names = this.groupByBanks[e];
      if(bank_Names && bank_Names.length){
        this.groupByStates = this.groupByAuto(bank_Names, "state");
        this.states = Object.keys(this.groupByStates)
      }
    }
  }

  onSelectState(e){
    this.districts = [];
    this.branchs = [];
    this.validations_form.value.districtName  = '';
    this.validations_form.value.branchName = '';
    if(e && e!=null && e!=="undefined"){
      const state_Names = this.groupByStates[e];
      if(state_Names && state_Names.length){
        this.groupByDistrict = this.groupByAuto(state_Names, "district");
        this.districts = Object.keys(this.groupByDistrict);
      }
    }
  }

  onSelectDistrict(e){
    this.branchs = [];
    this.validations_form.value.branchName = '';
    if(e && e!=null && e!=="undefined"){
      const district_Names = this.groupByDistrict[e];
      if(district_Names && district_Names.length){
        this.groupByBranch = this.groupByAuto(district_Names, "branchName");
        this.branchs = Object.keys(this.groupByBranch);
      }
    }
  }

  submit(e, values){
    const self = this;
    if(!self.validations_form.valid){  
      alert("Validation Error")
    }else{
      const result = this.bankData.find(function(obj){
      if(self.validations_form.value.bankName == obj.bank && self.validations_form.value.stateName == obj.state
        && self.validations_form.value.districtName == obj.district && self.validations_form.value.branchName == obj.branchName){
          return obj;
        }
      }); 
      self.result = result;
      this.submitForm = true;
      this.validations_form.reset();
    }
  }

  back(){
    this.submitForm = false;
    this.validations_form.reset();
  }

  ngOnInit(): void {

    this.validations_form = this.formBuilder.group({
      bankName: new FormControl('', Validators.required),
      stateName: new FormControl('', Validators.required),
      districtName: new FormControl('', Validators.required),
      branchName: new FormControl('', Validators.required),
    });

    this.bankData = [];
    this.bankServicesData();
  }

}
