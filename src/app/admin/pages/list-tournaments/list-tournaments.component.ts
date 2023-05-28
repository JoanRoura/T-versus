import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Tournament } from 'src/app/tournaments/interfaces/tournament.interface';

import { TournamentsService } from 'src/app/tournaments/services/tournaments.service';
import { AuthService } from 'src/app/auth/services/auth.service';

import { idGenerated } from 'src/app/tournaments/utils/gen-tournament-id';

import { MessageService } from 'primeng/api';

import { ConfirmationService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';

import { findIndexById } from '../../utils/find-index';

@Component({
  selector: 'app-list-tournaments',
  templateUrl: './list-tournaments.component.html',
  styleUrls: ['./list-tournaments.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ListTournamentsComponent implements OnInit {

  term: string = '';

  loading: boolean = true;
  submitted!: boolean;
  tournamentDialog!: boolean;

  tournament!: Tournament;
  tournaments!: Tournament[];
  selectedTournaments!: Tournament[];
  tournamentsSuggested!: Tournament[];

  tournamentDB!: Tournament;

  tournamentType: boolean = false;

  formNewTournament!: FormGroup;

  isUnofficial: boolean = false;

  @ViewChild('dt') dt: any;

  get user() {
    return this.authService.getCurrentUser;
  }

  constructor(
    private tournamentService: TournamentsService,
    private adminService: AdminService,
    private authService: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.formNewTournament = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      game: [null, [Validators.required]],
      price: [{ value: '', disabled: this.isUnofficial }, [Validators.required]],
      tournamentType: [null, [Validators.required]],
      image: [null, [Validators.required]]
    });

    // Escucha los cambios en el campo 'tournamentType'
    this.formNewTournament.get('tournamentType')?.valueChanges.subscribe((tournamentType) => {
      if (tournamentType === 'unofficial') {
        this.formNewTournament.get('price')?.disable();
      } else if (tournamentType === 'official') {
        this.formNewTournament.get('price')?.enable();
      }
    });

    this.getAllTournaments();
  }

  openDialog() {
    this.tournament = {};
    this.submitted = false;
    this.tournamentDialog = true;
    this.formNewTournament.reset();
  }

  hideDialog() {
    this.tournamentDialog = false;
    this.submitted = false;
  }

  // getClassCSS(campo: string): string {
  //   return (this.loginUser.get(campo)?.invalid && this.loginUser.get(campo)?.touched)
  //     ? "form-control is-invalid"
  //     : "form-control";
  // }

  getAllTournaments() {
    this.tournamentService.listTournaments()
      .subscribe((tournaments) => {
        this.loading = false;
        this.tournaments = tournaments;
      });
  }

  saveTournament() {
    this.submitted = true;

    const name = this.formNewTournament.value.name;
    const description = this.formNewTournament.value.description;
    const game = this.formNewTournament.value.game;
    const price = this.formNewTournament.value.price;
    const tournamentType = this.formNewTournament.value.tournamentType;
    const image = this.formNewTournament.value.image;

    // console.log(name, description, game, price, type, image);

    this.tournamentDB = {
      description: description,
      game: game,
      id: idGenerated().toString(),
      image: image,
      name: name,
      organizer: this.user.email,
      price: price ?? 0,
      type: tournamentType
      
    }

    console.log(this.tournament);

    if (this.tournament.name?.trim()) {
      if (this.tournament.id) {
        // TODO: Treure els ngModels i posar els valors dels camps aqui
        console.log('Id tournament: ', this.tournament.id, 'Tournament in the Form: ', this.tournamentDB);

        this.tournamentDB = { ...this.tournament };

        this.tournamentService.updateTournament(this.tournament.id, this.tournamentDB)
          .subscribe(resp => {
            console.log(resp);
          });

        this.tournaments[findIndexById(this.tournaments, this.tournament.id)] = this.tournament;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tournament Updated', life: 3000 });
      } else {

        this.tournamentService.createTournament(this.tournamentDB)
          .subscribe((tournament) => {
            console.log(tournament);
          });

        this.tournament = { ...this.tournamentDB };
        this.tournaments.push(this.tournament);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tournament Created', life: 3000 });
      }
    }

    this.tournaments = [...this.tournaments];
    this.tournamentDialog = false;
    this.tournament = {};
  }

  editTournament(tournament: Tournament) {
    this.tournament = { ...tournament };
    this.tournamentDialog = true;
  }

  deleteTournament(tournament: Tournament) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${tournament.name}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const tournamentId = tournament.id;

        this.tournamentService.deleteTournament(tournamentId!).subscribe(console.log);

        this.tournaments = this.tournaments.filter(val => val.id !== tournament.id);
        this.tournament = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tournament Deleted', life: 3000 });
      }
    });
  }

  searchTournament() {

    if (this.term === '') {
      this.getAllTournaments();
    }

    this.adminService.getSuggestionsTournaments(this.term)
      .subscribe(tournaments => this.tournaments = tournaments);
  }

  deleteSelectedTournaments() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected tournaments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.selectedTournaments.forEach(({ id }) => {
          this.tournamentService.deleteTournament(id!)
            .subscribe(console.log);
        });

        this.tournaments = this.tournaments.filter(tournament => !this.selectedTournaments.includes(tournament));
        this.selectedTournaments = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tournament Deleted', life: 3000 });
      }
    });
  }
}
