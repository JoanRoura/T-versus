import { Component, Input } from '@angular/core';
import { Tournament } from '../../interfaces/tournament.interface';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.css']
})
export class TournamentCardComponent {

  @Input() tournament!: Tournament;

}
