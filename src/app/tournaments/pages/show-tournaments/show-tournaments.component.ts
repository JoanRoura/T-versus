import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../interfaces/tournament.interface';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from '../../services/tournaments.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show-tournaments',
  templateUrl: './show-tournaments.component.html',
  styleUrls: ['./show-tournaments.component.css']
})
export class ShowTournamentsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamnetService: TournamentsService) { }


  ngOnInit(): void {

    // this.activatedRoute.params
    //   .pipe(
    //     switchMap(({ id }) => this.)
    //   )
    
  }

  tournaments!: Tournament[];

  typeTournament: string = "unofficial";
  typeTournament2: string = "official";



}
