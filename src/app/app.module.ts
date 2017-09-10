import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http' ;
import { DataTableModule } from 'angular2-datatable' ;

import { AppComponent }  from './app.component';
import { CompetitionsComponent } from './components/competitions.component' ;
import { LeagueComponent } from './components/league.component' ;
import { TeamComponent } from './components/team.component' ;
import { CountdownComponent } from './components/countdown.component' ;
import { routing } from './routes/component.routes';

@NgModule({
  imports:      [ BrowserModule, HttpModule, DataTableModule, routing],
  declarations: [ AppComponent, CompetitionsComponent,LeagueComponent,TeamComponent, CountdownComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
