import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Team } from '../team';
import { HeroService } from '../hero.service';

import { Hero, HeroTeam } from '../hero';


@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})

export class TeamDetailComponent implements OnInit {
  
  teams: Team[] = [];
  team: Team | undefined;
  heroes: Hero[] = [];
  hero: Hero | undefined;
  heroTeam: HeroTeam | undefined;


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTeam();
  }
  
  getTeam(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.heroService.getTeam(id)
    .subscribe(team => {
      this.team = team;
      this.getHeroesTeam();
      });
    }
    
  getHeroesTeam(): void {
    const id = (this.team?.id_team as number);
    this.heroService.getHeroesThatTeam(id)
    .subscribe(heroes => this.heroes = heroes);
    console.log(this.heroes)
  };
  saveTeam(): void {
    this.heroService.updateTeam(this.team)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  deleteTeam(team: Team): void {
    this.teams = this.teams.filter(h => h !== team);
    this.heroService.deleteTeam(team).subscribe();
  }
}
