import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameOfLifeService {

  constructor() { }
  universe = [];
}
