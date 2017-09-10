import { Component } from '@angular/core';
import { CompetitionService} from '../services/competitions.service'

@Component({
  selector: 'competitions',
  template: `
    <h4>Competitions</h4>
    <table class="table table-striped" [mfData]="data" #mf="mfDataTable" [mfRowsOnPage]="5">
    <thead>
    <tr>
        <th style="width: 20%">
            <mfDefaultSorter by="league">League</mfDefaultSorter>
        </th>
        <th style="width: 20%">
            <mfDefaultSorter by="caption">Caption</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="currentMatchday">Match Day No.</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="numberOfMatchdays">Tota Match Days</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="numberOfTeams">Number of Teams</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="numberOfGames">Number of Games</mfDefaultSorter>
        </th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let comp of competitions">
        <td><a [routerLink]="['/competitions/league',comp.league,comp.id]">{{comp.league}}</a></td>
        <td>{{comp.caption}}</td>
        <td class="text-right">{{comp.currentMatchday}}</td>
        <td class="text-right">{{comp.numberOfMatchdays}}</td>
        <td class="text-right">{{comp.numberOfTeams}}</td>
        <td class="text-right">{{comp.numberOfGames}}</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
        <td colspan="4">
            <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
        </td>
    </tr>
    </tfoot>
</table>
  `,
  providers:[CompetitionService]
})
export class CompetitionsComponent  { 
    competitions:Competition[] ;

    constructor(private compService:CompetitionService){
      this.compService.getCompetitions().subscribe(competitions => {
        this.competitions = competitions ;
      }) ;
    }
}

interface Competition{
  "id":number,
  "caption": string,
  "league": string,
  "year": string,
  "currentMatchday": number,
  "numberOfMatchdays": number,
  "numberOfTeams": number,
  "numberOfGames": number,
  "_links":Object
}
