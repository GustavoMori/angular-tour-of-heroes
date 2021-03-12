import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// import { Observable, Subject } from 'rxjs';

import { Hero, HeroTeam } from '../hero';
import { HeroService } from '../hero.service';
import { Team } from '../team';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
  
  heroes: Hero[] = [];
  hero: Hero | undefined;
  dataLoaded: HeroTeam | undefined;
  teams: Team[] = [];
  team: Team | undefined;
  allteams: Team[] = [];

  //teams$?: Observable<Team[]>;

  //private searchTerms = new Subject<string>();
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getTeams();
  }

  getHero(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        this.getTeamsHeroes();
      }
    );
  }

  getTeams(): void {
    this.heroService.getTeams()
    .subscribe(teams => this.allteams = teams);
  };


  getTeamsHeroes(): void {
    const id = (this.hero?.id as number);
    this.heroService.getTeamsthatHeroes(id)
    .subscribe(teams => this.teams = teams);
  };

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack()); // não esquecer de arrancar o goback daqui e implementar em série a execução durante o save
  }

  goBack(): void {
    this.location.back();
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }


  AddHeroInNewTeam(id_team: number): void { // essa funcionalidade implementará na tabela de relacionamento hero-team
    const newTeam = this.allteams.find(team => team.id_team === id_team )
    const id = (this.hero?.id as number);
    this.heroService.heroInNewTeam(id, id_team)
    .subscribe(teams => this.teams.push(newTeam as Team))
  }
}


