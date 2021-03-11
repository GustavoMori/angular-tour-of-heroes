import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  errorMessage!: string;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  };

  add(name: string): any {
    // const testNameExist = this.heroes.find(hero => hero.name.toUpperCase === name.toUpperCase)
    
    // if (testNameExist) {
    //   this.errorMessage = 'Esse nome de herói já existe';
    //   return this.errorMessage ;
    // }

    // else {
      name = name.trim();
      if (!name) { return; }
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero as Hero);
        },
        err => {
          if ((err.status) == 409) {
            alert("That name is already in use")
          }
        }
        );
    // }


  }
  /*
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  */
}