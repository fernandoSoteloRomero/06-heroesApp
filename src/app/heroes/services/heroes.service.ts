import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { env } from '../../../env/env';

@Injectable({providedIn: 'root'})
export class HeroesService {
  constructor(private http: HttpClient) { }
  private baseUrl: string = env.baseUrl;

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  
}