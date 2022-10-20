import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MyLogService {
    log (msg: any) {
        console.log (new Date() + " : " + JSON.stringify(msg));
    }
}