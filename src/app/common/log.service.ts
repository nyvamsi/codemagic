import {Injectable} from '@angular/core';

export class MyLogService {
    log (msg: any) {
        console.log (new Date() + " : " + JSON.stringify(msg));
    }
}