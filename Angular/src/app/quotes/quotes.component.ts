import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';
import {ToastrService} from 'node_modules/ngx-toastr';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private service: ShareService, private router:Router, private toastr: ToastrService ) { }

  QuotesList:any=[];
  ModalTitle:string;
  ActivateShowQuote:boolean = false;
  ActivateAddEditQuote: boolean = false;
  Quote:any;
  p:number =1;
  i: number =5;
  

  sortcolumn: string;

  ngOnInit(): void {
    this.refreshQuotesList();
  }


  refreshQuotesList(){
    this.service.getQuotesList().subscribe(
      data=>{this.QuotesList=data;},
      error=> { this.toastr.error("Cannot show data","Error")
      }
      
      );
  }

  viewClick(item) {
    this.Quote = item;
    this.ActivateShowQuote =true;

  }

  editClick(item){
    this.Quote = item;
    this.ModalTitle = "Update Task"
    this.ActivateAddEditQuote = true;
  }

  addClick(){
    this.Quote ={
      quoteID: 0,
      quote_Type:"",
      contact:"",
      task:"",
      due_Date:"",
      task_type:"",
      status:""

    }
    this.ModalTitle = "Add Task"
    this.ActivateAddEditQuote = true;

  }

  deleteClick(item){
    if (confirm("Do you want to delete this task?")){
      this.service.deleteQuotes(item).subscribe(
      res=> {this.toastr.success("Delete task success","Success")
             this.refreshQuotesList();
      },
      error => {this.toastr.error("Something Wrong", "Error")}
      )
    }

  }

  viewcloseClick(){
    this.ActivateShowQuote =false;

  }

  closeClick(){
    this.ActivateAddEditQuote=false;
    this.refreshQuotesList();
  }

  logout() {
    this.service.dologin=false;
    this.router.navigate(['/login']);
  }

  filter(data: string){
 
    if(data){
      this.QuotesList = this.QuotesList.filter((Quote)=>{
        return Quote.contact.toLowerCase().indexOf(data.toLowerCase()) >-1 ||
                Quote.task_type.toLowerCase().indexOf(data.toLowerCase()) >-1 ||
                Quote.due_Date.indexOf(data) >-1;
                
      });

    }else {
      this.refreshQuotesList();
    }
  }

  ////sort property
  property: string = null;
  direction: number = 1;
  DES:boolean;
  sort(prop:string){
    this.sortfunction(this.QuotesList,prop);
  }
  //sort functionality part
  sortfunction(collection: any[], prop: any) {
      this.property = prop;
      this.direction = (this.property === prop) ? this.direction * -1 : 1;
      

      collection.sort((a: any,b: any) => {
          let aVal: any;
          let bVal: any;
          
          //Handle resolving complex properties such as 'state.name' for prop value
          if (prop && prop.indexOf('.') > -1) {
            aVal = this.resolveProperty(prop, a);
            bVal = this.resolveProperty(prop, b);
          }
          else {            
            aVal = a[prop];
            bVal = b[prop];
          }
          
         // Fix issues that spaces before/after string value can cause such as ' San Francisco'
          if (this.isString(aVal)) aVal = aVal.trim().toUpperCase();
          if (this.isString(bVal)) bVal = bVal.trim().toUpperCase();
        
          if(aVal === bVal){
              return 0;
          }
          else if (aVal < bVal && !this.DES){
              return this.direction * 1;
          }
          else if (aVal > bVal && this.DES){
              return this.direction * -1;
          }
      });
  }
    
    isString(val: any) : boolean {
      return (val && (typeof val === 'string' || val instanceof String));
    }

    resolveProperty(path: string, obj: any) {
      return path.split('.').reduce(function(prev, curr) {
          return (prev ? prev[curr] : undefined)
      }, obj || self)
    }


}
