import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'countdown',
  template: `
    <p>{{countdownStr}}</p>
  `,
})
export class CountdownComponent implements OnInit, OnDestroy {
    matchDate: Date ;
    @Input()
    matchDateStr: string ;
    timeDiff: number ;
    $counter: Observable<number> ;
    sub: Subscription ;
    countdownStr: string ;
    constructor(){
    }

    formatTime(time:number){
        var days, hrs, mins, secs;
        days = Math.floor(time / 86400);
        time -= days * 86400;
        hrs = Math.floor(time / 3600) % 24;
        time -= hrs * 3600;
        mins = Math.floor(time / 60) % 60;
        time -= mins * 60;
        secs = time % 60;

        return [
            days + 'd',
            hrs + 'h',
            mins + 'm',
            secs + 's'
        ].join(' ');
    }

    ngOnInit() {
        this.matchDate = new Date(this.matchDateStr);
        this.$counter = Observable.interval(1000).map((x) => {
            this.timeDiff = Math.floor((this.matchDate.getTime() - new Date().getTime()) / 1000);
            return x;
        });

        this.sub = this.$counter.subscribe((x) => this.countdownStr = this.formatTime(this.timeDiff));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }


}
