import { Component, OnInit } from '@angular/core';

import { Team } from '../team';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  errorMessage!: string;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.heroService.getTeams()
    .subscribe(teams => this.teams = teams);
  };

  add(name: string): any {

    name = name.trim();
    if (!name) { return; }
    this.heroService.addTeam({ name } as Team)
      .subscribe(team => {
        this.teams.push(team as Team);
      },
      err => {
        if ((err.status) == 409) {
          alert("That name is already in use")
        }
      });
  }
  /*
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  */
}
