import { Component, OnInit,Input } from '@angular/core';
import { ShareService } from 'src/app/share.service';

@Component({
  selector: 'app-show-quotes',
  templateUrl: './show-quotes.component.html',
  styleUrls: ['./show-quotes.component.css']
})
export class ShowQuotesComponent implements OnInit {

  constructor(private service: ShareService) { }

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




}
