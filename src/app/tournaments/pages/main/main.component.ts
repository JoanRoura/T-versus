import { Component, OnInit } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../interfaces/tournaments.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tournaments!: Tournament[];

  constructor(private tournamentsService: TournamentsService) { }

  ngOnInit(): void {
    this.tournamentsService.listTournaments()
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      })
  }
}
