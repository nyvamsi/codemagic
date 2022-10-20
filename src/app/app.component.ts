import { Component } from '@angular/core';
import{ GlobalConstants } from './common/global-constants';
import { MyLogService } from './common/log.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private mylogger: MyLogService) {
    mylogger.log("Intial Constant: " + GlobalConstants.GLOBALCONSTANTTITLE);
  }
}
