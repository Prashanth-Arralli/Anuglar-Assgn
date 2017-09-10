import { Component } from '@angular/core';
import { CompetitionService} from '../services/competitions.service' ;
import { ActivatedRoute } from '@angular/router';
import { CountdownComponent } from './countdown.component' ;
@Component({
  selector: 'league',
  template: `
    <div>
    <h4><a [routerLink]="['/competitions']">Competitions</a> | <a [routerLink]="['/competitions/league',leagueName,leagueId]">{{ leagueName }}</a> |
    {{ teamName }}
    </h4>
    </div>
    <table class="table table-striped" [mfData]="data" #mfPlayer="mfDataTable" [mfRowsOnPage]="5">
    <thead>
    <tr>
        <th style="width: 20%">
            <mfDefaultSorter by="name">Name</mfDefaultSorter>
        </th>
        <th style="width: 10%">
            <mfDefaultSorter by="position">Position</mfDefaultSorter>
        </th>
        
        <th style="width: 15%">
            <mfDefaultSorter by="jerseyNumber">Jersey Number</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="dateOfBirth">DOB</mfDefaultSorter>
        </th>
        <th style="width: 10%">
            <mfDefaultSorter by="nationality">Nationality</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="contractUntil">Contract Until</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="marketValue">Market Value</mfDefaultSorter>
        </th>
    </tr>
    </thead>
    <tbody *ngIf="players?.length > 0;else noData">
    <tr *ngFor="let player of players">
        <td>{{player.name}}</td>
        <td class="text-right">{{player.position}}</td>
        <td class="text-right">{{player.jerseyNumber}}</td>
        <td>{{player.dateOfBirth}}</td>
        <td>{{player.nationality}}</td>
        <td>{{player.contractUntil}}</td>
        <td class="text-right">{{player.marketValue}}</td>
    </tr>
    </tbody>
    <ng-template #noData style="width:100%;">No Data Available</ng-template>
    <tfoot>
    <tr>
        <td colspan="4">
            <mfBootstrapPaginator [rowsOnPageSet]="[5,10,25]"></mfBootstrapPaginator>
        </td>
    </tr>
    </tfoot>
</table> 
<h4>Upcoming Fixtures</h4>
<table class="table table-striped" [mfData]="data" #mfFixture="mfDataTable" [mfRowsOnPage]="5">
    <thead>
    <tr>
        <th style="width: 30%">
            <mfDefaultSorter by="date">Date & Time</mfDefaultSorter>
        </th>
        <th style="width: 20%">
            <mfDefaultSorter by="homeTeamName">Home Team</mfDefaultSorter>
        </th>
        
        <th style="width: 20%">
            <mfDefaultSorter by="awayTeamName">Away Team</mfDefaultSorter>
        </th>
        <th style="width: 10%">
            <mfDefaultSorter by="matchday">Match Day</mfDefaultSorter>
        </th>
        <th style="width: 20%">
            <mfDefaultSorter by="countdown">Count Down</mfDefaultSorter>
        </th>
    </tr>
    </thead>
    <tbody>
        <tr *ngFor="let fixture of fixtures">
            <td>{{changeDateFormat(fixture.date)}}</td>
            <td>{{fixture.homeTeamName}}</td>
            <td>{{fixture.awayTeamName}}</td>
            <td class="text-right">{{fixture.matchday}}</td>
            <td><countdown [matchDateStr]="fixture.date"></countdown></td>
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
export class TeamComponent  { 
    teamId:number;
    teamName:string;
    leagueName:string ;
    leagueId:number ;
    players:Player[] ;
    fixtures: Fixture[] ;
    
    constructor(private compService:CompetitionService,private route: ActivatedRoute){
        this.route.params.subscribe(params => {
            this.teamId = params["id"] ;
            this.teamName = params["name"] ;
            this.leagueId = params["leagueid"] ;
            this.leagueName = params["leaguename"] ;
            this.compService.getPlayers(this.teamId).subscribe(players => {
                this.players = players.players ;
            }) ;

            this.compService.getFixtures(this.teamId).subscribe(fixtures => {
                this.fixtures = fixtures.fixtures.splice(0,5) ;
            }) ;
        }) ;
    }

    
    changeDateFormat(dateStr: string): string{
        var date = new Date(dateStr) ;
        return date.toUTCString();
    }

}

interface Player{
    "name": string,
    "position": string,
    "jerseyNumber": number,
    "dateOfBirth": string,
    "nationality": string,
    "contractUntil": string,
    "marketValue": number
}

interface Fixture{
    "date": string,
    "status": string,
    "matchday": number,
    "homeTeamName": string,
    "awayTeamName": string,
}


