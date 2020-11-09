import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private service: ShareService) { }

  QuotesList:any=[];

  ngOnInit(): void {
    this.refreshQuotesList();
  }
  refreshQuotesList(){
    this.service.getQuotesList().subscribe(
      data=>{this.QuotesList=data;},
      error=> {alert("cannot show data")}
      
      );
  }



}
