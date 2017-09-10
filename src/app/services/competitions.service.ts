import {Injectable} from '@angular/core' ;
import {Http, Headers} from '@angular/http' ;
import 'rxjs/add/operator/map' ;

@Injectable()
export class CompetitionService{
    headers: Headers = new Headers() ;
    constructor( private http:Http){
        this.headers.append('X-Auth-Token','51fada5cb4d9488b8261e9fe328a5eba') ;
        console.log("This is a CompetitionService");
    }

    getCompetitions(){
        var url = 'http://api.football-data.org/v1/competitions' ;
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/' ;
        
        return this.http.get(proxyUrl+url,{
            headers:this.headers
        })
        .map(res => res.json()) ;
    }

    getLeagueTable(leagueId:number){

        var url = 'http://api.football-data.org/v1/competitions/'+ leagueId+'/leagueTable' ;
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/' ;
        return this.http.get(proxyUrl+url,{
            headers:this.headers
        })
        .map(res => res.json()) ;
    }

    getPlayers(teamId:number){
        var url = 'http://api.football-data.org/v1/teams/'+teamId+'/players' ;
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/' ;
        return this.http.get(proxyUrl+url,{
            headers:this.headers
        })
        .map(res => res.json()) ;
    }

    getFixtures(teamId:number){
        var url = 'http://api.football-data.org/v1/teams/'+teamId+'/fixtures?timeFrame=n99' ;
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/' ;
        return this.http.get(proxyUrl+url,{
            headers:this.headers
        })
        .map(res => res.json()) ;
    }
}