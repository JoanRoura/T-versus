import { Component, Input, OnInit } from '@angular/core';
import { Tournament } from '../../interfaces/tournament.interface';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament!: Tournament;
  @Input() email: string = "";

  isCreator: boolean = false;

  ngOnInit(): void {
    this.checkIsCreator();
  }

  checkIsCreator(): void {
    if (this.tournament.organizer === this.email) {
      this.isCreator = true;
      console.log("Hay coincidencia");
    }
  }
}
