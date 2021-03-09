import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-powerfull',
  templateUrl: './powerfull.component.html',
  styleUrls: ['./powerfull.component.css']
})
export class PowerfullComponent implements OnInit {

  heroes: Hero[] = [];
  hero: Hero | undefined;
  teste: string ='';
  
  constructor(
    private heroService: HeroService,
  ) {}
  ngOnInit(): void {
  }

  getPowerfull(): void  {
    this.teste = 'teste';
    this.heroService.getPowerfull().subscribe(resp => this.hero = resp);
    console.log(this.hero)
  }
}
