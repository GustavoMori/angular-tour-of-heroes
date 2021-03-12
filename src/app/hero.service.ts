import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero, HeroTeam } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Team } from './team';

@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(private http: HttpClient, 
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'https://localhost:44385/api/hero';  // URL to web api
  private teamsURl = 'https://localhost:44385/api/team'; // URL to web api 
  private heroTeamUrl = '  https://localhost:44385/api/team'; // URL to web api 
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET MOST POWERFULL HERO */
  getPowerfull(): Observable<Hero> {
    const urlpowerfull = `${this.heroesUrl}/powerfull`;
    return this.http.get<Hero>(urlpowerfull).pipe(
        tap(_ => this.log('fetched hero most powerfull')),
    );
  }



/*
  getHero(id: any): Observable<Hero | undefined> {
    const novoId = +id;
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${novoId}`);
    const heroes = HEROES;

    return of(HEROES.find(hero => hero.id == novoId));
  }
  */

  /** GET hero by id. Will 404 if id not found */
  getHero(id: any): Observable<Hero> {
    const novoId = +id;
    const url = `${this.heroesUrl}/${novoId}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${novoId}`)),
      catchError(this.handleError<Hero>(`getHero id=${novoId}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero | undefined): Observable<any> {
    return this.http.put(this.heroesUrl + "/" + hero?.id, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero?.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero | HttpErrorResponse> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      // catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /* TEAMS */
  searchTeams(term: string): Observable<Team[]>{
    if (!term.trim()) {
      // if not search term, return empty team array.
      return of([]);
    }
    return this.http.get<Team[]>(`${this.teamsURl}/?name=${term}`).pipe(
      tap(x => x.length?
        this.log(`found teams matching "${term}"`):
        this.log(`no teams matching "${term}"`)),
      catchError(this.handleError<Team[]>('searchTeams', []))
    )
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsURl)
      .pipe(
        tap(_ => this.log('fetched teams')),
        catchError(this.handleError<Team[]>('getTeams', []))
      );
  }
  // Estou deixando add times com mesmo nome
  addTeam(team: Team): Observable<Team | HttpErrorResponse> {
    return this.http.post<Team>(this.teamsURl, team, this.httpOptions).pipe(
      tap((newTeam: Team) => this.log(`added team w/ id=${newTeam.id_team}`)),
      // catchError(this.handleError<Hero>('addHero'))
    );
  }

  getTeam(id: any): Observable<Team> {
    const novoId = +id;
    const url = `${this.teamsURl}/${novoId}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => this.log(`fetched team id=${novoId}`)),
      catchError(this.handleError<Team>(`getHero id=${novoId}`))
    );
  }
  updateTeam(team: Team | undefined): Observable<any> {
    return this.http.put(this.teamsURl + "/" + team?.id_team, team, this.httpOptions).pipe(
      tap(_ => this.log(`updated team id=${team?.id_team}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }
  deleteTeam(team: Team | number): Observable<Team> {
    const id = typeof team === 'number' ? team : team.id_team;
    const url = `${this.teamsURl}/${id}`;

    return this.http.delete<Team>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted team id=${id}`)),
      catchError(this.handleError<Team>('deleteTeam'))
    );
  }
  /* HEROES AND TEAMS*/
  getHeroesThatTeam(id_team: number): Observable<Hero[]> {
    const url = `${this.heroTeamUrl}/${id_team}/heroes`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`fetched hero in this team id=${id_team}`)),
      catchError(this.handleError<Hero[]>(`getHeroesThatTeam id=${id_team}`))
    )
  }

  getTeamsthatHeroes(id: number): Observable<Team[]> {
    const url = `${this.heroTeamUrl}/${id}/teams`;
    return this.http.get<Team[]>(url).pipe(
      tap(_ => this.log(`fetched team in this hero id=${id}`)),
      catchError(this.handleError<Team[]>(`getTeamsthatHeroes id=${id}`))
    )
  }

  heroInNewTeam(id: number, id_team: number): Observable<null>{
    const url = `${this.heroTeamUrl}/relationship`;
    return this.http.post<null>(url, {hero_idfk: id, team_idfk: id_team}).pipe(
      tap(_ => this.log(`fetched team in this hero id=${id}`)),
      catchError(this.handleError<null>(`heroInNewTeam id=${id}`))
    )
  }

  kickHero(id: number, id_team: number ): Observable<null>{
    const url = `${this.heroTeamUrl}/relationship/kick`;
    return this.http.post<null>(url, {hero_idfk: id, team_idfk: id_team}).pipe(
      tap(_ => this.log(`fetched hero id=${id}was kicked`)),
      catchError(this.handleError<null>(`kickHero id=${id}`))
    )
  }

  // addTeam(team: Team): Observable<Team | HttpErrorResponse> {
  //   return this.http.post<Team>(this.teamsURl, team, this.httpOptions).pipe(
  //     tap((newTeam: Team) => this.log(`added team w/ id=${newTeam.id_team}`)),
  //     // catchError(this.handleError<Hero>('addHero'))
  //   );
  // }
}
