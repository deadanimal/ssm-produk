import { Component, OnInit } from "@angular/core";
/// get ticket service
import { TicketsService } from "src/app/shared/services/ticket/ticket.service";

@Component({
  selector: "app-enquiry-history",
  templateUrl: "./enquiry-history.component.html",
  styleUrls: ["./enquiry-history.component.scss"],
})
export class EnquiryHistoryComponent implements OnInit {
  listTickets: any;
  total: number;
  totaldocument: number;

  constructor(private TicketsService: TicketsService) {}

  ngOnInit(): void {
    this.TicketsService.getAll().subscribe(
      (res) => {
        console.log(res);
        this.listTickets = res;

        // this.listTickets.forEach((lisz) => {
        //   this.total += lisz.total_price;
        //   this.totaldocument++;
        // });
        console.log("ticketList => ", this.listTickets);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
