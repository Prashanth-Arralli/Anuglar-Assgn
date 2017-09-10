import { Routes, RouterModule } from '@angular/router';
import { CompetitionsComponent } from "../components/competitions.component";
import { LeagueComponent } from "../components/league.component";
import { TeamComponent } from "../components/team.component";
const comp_routes: Routes = [
    //full : makes sure the path is absolute path
    { path: '', redirectTo: '/competitions', pathMatch: 'full' },
    {   
        path: 'competitions', 
        component: CompetitionsComponent
    },
    {   path: 'competitions/league/:name/:id', 
        component: LeagueComponent,
        data:{ breadcrumb:"League"},
    },
    {   path: 'competitions/league/:leaguename/:leagueid/team/:name/:id', 
        component: TeamComponent,
        data:{ breadcrumb:"Team"}
    }
];
export const routing = RouterModule.forRoot(comp_routes);