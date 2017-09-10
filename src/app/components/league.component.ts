import { Component } from '@angular/core';
import { CompetitionService} from '../services/competitions.service' ;
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'league',
  template: `
    <div>
    <h4><a [routerLink]="['/competitions']">Competitions</a> | {{ leagueName }} </h4>
    </div>
    <table class="table table-striped" [mfData]="data" #mf="mfDataTable" [mfRowsOnPage]="5">
    <thead>
    <tr>
        <th style="width: 10%">
            <mfDefaultSorter by="position">Position</mfDefaultSorter>
        </th>
        <th style="width: 20%">
            <mfDefaultSorter by="team">teamName</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="playedGames">Games Played</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="points">Points</mfDefaultSorter>
        </th>
        <th style="width: 10%">
            <mfDefaultSorter by="wins">Wins</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="draws">Draws</mfDefaultSorter>
        </th>
        <th style="width: 15%">
            <mfDefaultSorter by="losses">Losses</mfDefaultSorter>
        </th>
    </tr>
    </thead>
    <tbody>
    <tr *ngFor="let team of teams">
        <td class="text-right">{{team.position}}</td>
        <td><a [routerLink]="['/competitions/league',leagueName,leagueId,'team',team.teamName,getTeamId(team._links.team.href)]">{{team.teamName}}</a></td>
        <td class="text-right">{{team.playedGames}}</td>
        <td class="text-right">{{team.points}}</td>
        <td class="text-right">{{team.wins}}</td>
        <td class="text-right">{{team.draws}}</td>
        <td class="text-right">{{team.losses}}</td>
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
export class LeagueComponent  { 
    leagueId:number;
    leagueName:string ;
    teams:Team[] ;
    sub:any ;

    constructor(private compService:CompetitionService, private route: ActivatedRoute){
        this.sub = this.route.params.subscribe(params => {
            this.leagueName = params["name"] ;
            this.leagueId = params["id"] ;
            this.compService.getLeagueTable(this.leagueId).subscribe(teams => {
                this.teams = teams.standing ;
            }) ;
        }) ;
    }

    getTeamId(link: string){
        var indexOfLastSlash = link.lastIndexOf("/") ;
        var teamId = link.substring(indexOfLastSlash+1) ;
        return teamId ;
    }

}

interface Team{
    "position": number,
    "teamName": string,
    "crestURI": string,
    "playedGames": number,
    "points": number,
    "goals": number,
    "goalsAgainst": number,
    "goalDifference": number,
    "wins": number,
    "draws": number,
    "losses": number,
    "_links":Object
}
