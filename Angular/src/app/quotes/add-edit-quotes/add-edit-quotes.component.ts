import { Component, OnInit, Input} from '@angular/core';
import { ShareService } from 'src/app/share.service';
import {ToastrService} from 'node_modules/ngx-toastr';
@Component({
  selector: 'app-add-edit-quotes',
  templateUrl: './add-edit-quotes.component.html',
  styleUrls: ['./add-edit-quotes.component.css']
})
export class AddEditQuotesComponent implements OnInit {

  constructor(private service: ShareService, private toastr: ToastrService) { }

  @Input() Quote:any;
  QuoteID:string;
  Quote_Type:string;
  Contact:string;
  Task:string;
  Due_Date:Date;
  Task_type:string;
  Status:number;

  ngOnInit(): void {
    this.QuoteID = this.Quote.quoteID
    this.Quote_Type = this.Quote.quote_Type
    this.Contact = this.Quote.contact
    this.Task = this.Quote.task
    this.Due_Date = this.Quote.due_Date
    this.Task_type = this.Quote.task_type
    this.Status = this.Quote.status

  }

  updateQuote(){
    var q = {
      quoteID: this.QuoteID,
      quote_Type: this.Quote_Type,
      contact: this.Contact,
      task: this.Task,
      due_Date: this.Due_Date,
      task_type: this.Task_type,
      status: this.Status
    }

    this.service.updateQuotes(this.Quote.quoteID,q).subscribe(
      res => {this.toastr.success("Update success!", "Success")},
      error => {this.toastr.error("Something Wrong","Error")}
    )
  }

  addQuote(){
    var q = {
      quoteID: this.QuoteID,
      quote_Type: this.Quote_Type,
      contact: this.Contact,
      task: this.Task,
      due_Date: this.Due_Date,
      task_type: this.Task_type,
      status: this.Status
    }
    this.service.addQuotes(q).subscribe(
      res => { this.toastr.success("New task add success", "Success")},
      error => {this.toastr.error("Something Wrong","Error")}

    )
  }



}
