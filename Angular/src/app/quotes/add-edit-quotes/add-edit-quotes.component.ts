import { Component, OnInit, Input} from '@angular/core';
import { ShareService } from 'src/app/share.service';

@Component({
  selector: 'app-add-edit-quotes',
  templateUrl: './add-edit-quotes.component.html',
  styleUrls: ['./add-edit-quotes.component.css']
})
export class AddEditQuotesComponent implements OnInit {

  constructor(private service: ShareService) { }

  @Input() Quote:any;
  QuoteID:string;
  Quote_Type:string;
  Contact:string;
  Task:string;
  Due_Date:Date;
  Task_type:string

  ngOnInit(): void {
    this.QuoteID = this.Quote.quoteID
    this.Quote_Type = this.Quote.quote_Type
    this.Contact = this.Quote.contact
    this.Task = this.Quote.task
    this.Due_Date = this.Quote.due_Date
    this.Task_type = this.Quote.task_type

  }

  updateQuote(){
    var q = {
      quoteID: this.QuoteID,
      quote_Type: this.Quote_Type,
      contact: this.Contact,
      task: this.Task,
      due_Date: this.Due_Date,
      task_type: this.Task_type
    }

    this.service.updateQuotes(this.Quote.quoteID,q).subscribe(
      res => {alert("Update success!")},
      error => {alert("something wrong")}
    )
  }

  addQuote(){
    var q = {
      quoteID: this.QuoteID,
      quote_Type: this.Quote_Type,
      contact: this.Contact,
      task: this.Task,
      due_Date: this.Due_Date,
      task_type: this.Task_type
    }
    this.service.addQuotes(q).subscribe(
      res => {alert("new task add success")},
      error => {alert(error)}

    )
  }



}
