import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';

import { Tournament } from '../../../interfaces/tournament.interface';

import { TournamentsService } from '../../../services/tournaments.service';
import { AuthUser } from 'src/app/auth/interfaces/auth-user.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Ronda } from '../../../interfaces/ronda.interface';
import { Equip } from 'src/app/tournaments/interfaces/equip.interface';
import { Match } from 'src/app/tournaments/interfaces/match.interface';

@Component({
  selector: 'app-tournament-creator',
  templateUrl: './tournament-creator.component.html',
  styleUrls: ['./tournament-creator.component.css']
})
export class TournamentCreatorComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  tournament!: Tournament;

  usersInTournament!: AuthUser[];
  userJoinedInTournament!: AuthUser;
  editingName: boolean = false;
  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.tournamentsService.getOneTournament(id)),
        // tap(console.log)
      )
      .subscribe((tournament) => {
        this.tournament = tournament
        console.log(this.tournament)
        this.seeRounds()
      });

  

    // Obtenir el current user
    this.authService.getOneUser(this.user.email)
      .subscribe(user => {
        this.userJoinedInTournament = user;
      })
  }
  originalName = '';
  originarDescription ='';

  onNameInput(event: any) {
    this.originalName = event.target.innerText;
  }
  onDescInput(event: any) {
    this.originarDescription = event.target.innerText;
  }

  saveValues() {
    // Obtener el valor actualizado del nombre
    const newName = this.originalName;
    const newDesc = this.originarDescription

    this.tournament.name = newName;
    this.tournament.description = newDesc;

    this.updateTournament()
  }


  updateTournament(){
    this.tournamentsService.updateTournament (this.tournament.id?? "1",this.tournament)
      .subscribe(resp => {
        console.log(resp);
      });
  }

  goBack(): void {
    this.router.navigate(['/tournaments/main']);
  }

  get user() {
    return this.authService.getCurrentUser;
  }

  seeRounds() {

    this.tournamentsService.getRondes(this.tournament.id??"0").subscribe((rondas: Ronda[]) => {

      this.tournament.rounds = rondas;

      console.log("Torneo actualizado con las rondas:");
      console.log(this.tournament);
    }, (error) => {
      // Manejar el error de getRondes
      console.error("Error al obtener las rondas del torneo:", error);
    });

  const tournamentId = this.tournament.id;
  console.log(tournamentId)

}

firstRound(): void {
  const limite = (this.tournament.teamsNumber ?? 0) * 5;
  const lista = this.tournament.users ?? [];
  const numero = 1;

  let ronda: Ronda = {
    roundNumber: numero,
    tournamentId: this.tournament.id ?? "1",
    matches: [],
    estadoRonda: 'Abierta',
    teams: this.crearEquipos(lista, limite)
  };



  ronda.matches=this.createMatches(ronda.teams);

  this.tournamentsService.deleteRondes (this.tournament.id?? "1")
      .subscribe(resp => {
        console.log(resp);
      });

    this.tournamentsService.addRound (this.tournament.id?? "1",ronda)
        .subscribe(resp => {
          console.log(resp);
        });


    }

    toggleEditingName() {
      this.editingName = !this.editingName;
    }

createMatches(teams: Equip[]): Match[] {
    const newMatches: Match[] = [];

    for (let i = 0; i < teams.length; i += 2) {

      const team1 = teams[i];
      const team2 = teams[i + 1];

      const equipoGanador: Equip = {
        nom: "null",
        integrantes: [null, null, null, null, null]
      };

      const match: Match = { equipo1: team1, equipo2: team2, ganador: equipoGanador, ganadorSeleccionado: false };

      newMatches.push(match);
    }
    return newMatches;
  }

crearEquipos(users: any[], limite: number): Equip[] {
  const numUsers = this.tournament.users?.length ?? 0;
  console.log('Users', this.tournament.users);

  const nombres = [
    'Ana', 'Beto', 'Carla', 'Daniel', 'Elena', 'Fernando', 'Gabriela', 'Hugo',
    'Inés', 'Juan', 'Karla', 'Luis', 'María', 'Nicolás', 'Olivia', 'Pedro',
    'Quim', 'Rosa', 'Santiago', 'Teresa', 'Ursula', 'Víctor', 'Wendy', 'Xavier',
    'Yolanda', 'Zacarías', 'Alejandra', 'Benito', 'Catalina', 'Diego', 'Emilia', 'Felipe',
    'Gloria', 'Héctor', 'Isabela', 'Javier', 'Karen', 'Lorenzo', 'Mónica','Natalia', 'Óscar', 'Patricia', 'Quirino', 'Ricardo', 'Sandra', 'Tomás', 'Úrsula',
    'Violeta', 'Wilfredo', 'Ximena', 'Yara', 'Zaida', 'Adrián', 'Bianca', 'Carlos',
    'Diana', 'Eduardo', 'Fátima', 'Gerardo', 'Héctor', 'Iván', 'Jessica', 'Kevin',
    'Laura', 'Mario', 'Nadia', 'Óscar', 'Pamela', 'Quintín', 'Roberta', 'Santiago',
    'Tatiana', 'Ulises', 'Valentina', 'William', 'Xiomara', 'Yolanda', 'Zoe'
  ];

  // Hacer una lista de los usuarios que hay e ir añadiéndoles generados hasta el límite
  let j = 0;
  const listaUsers: any[] = [];
  listaUsers.push(...(this.tournament.users || []));

  while (listaUsers.length < limite) {
    const map: any = {};
    const nombre = nombres[j];

    map.username = nombre;
    map.correu = `${nombre}@institutvidreres.cat`;
    listaUsers.push(map);
    j++;
    if (j === nombres.length) {
      j = 0;
    }
  }

  const result: any[][] = this.splitParticipantsIntoGroups(listaUsers);
  const equips: Equip[] = [];
  let i = 0;

  for (const lista of result) {
    i++;
    const equipo: Equip={
      nom: `Equipo ${i}`,
      integrantes: lista
    };

    equips.push(equipo);
  }

  return equips;
}

splitParticipantsIntoGroups(participants: any[]): any[][] {
  const groups: any[][] = [];
  let currentGroup: any[] = [];

  for (const participant of participants) {
    currentGroup.push(participant);

    if (currentGroup.length === 5) {
      groups.push(currentGroup);
      currentGroup = [];
    }
  }

  // Añadir el último grupo incompleto si existe
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}
}
