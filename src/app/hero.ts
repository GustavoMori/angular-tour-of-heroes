import { Team } from './team';

export interface Hero {
    id: number;
    name: string;
    power: number;
    agility: number;
}


export interface HeroTeam {
    hero: Hero;
    team: Team;
}