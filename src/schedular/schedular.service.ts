import { Injectable, Logger } from '@nestjs/common';
import {Cron, CronExpression,SchedulerRegistry, Interval, Timeout}from '@nestjs/schedule'
@Injectable()
export class SchedularService {
    constructor(private schedulerRegistry: SchedulerRegistry) {}
    private readonly logger = new Logger(SchedularService.name);



//_________________________________________________________________________________
// cron:called repeatedly at specific time according to system clock
// Use the time can be by String("******") or by CronExpression.EVERY_10_SECONDS
// attributes can be added :
//      - name: to identify the cron job
//      - time zone: to set the time zone for the cron job
//      -utcoffset: to set the time offset for the cron job , the place you are.
//      - runOnInit: to run the cron job immediately after the application starts
//      - ignoreInDevelopment: to ignore the cron job in development environment
//      - ignoreInProduction: to ignore the cron job in production environment
//      - ignoreInTesting: to ignore the cron job in testing environment
//      - ignoreInStaging: to ignore the cron job in staging environment
//      -DISABLED: to disable the cron job
//      -WAITFORCOMPLETION:wait for event

@Cron(CronExpression.EVERY_5_SECONDS)
    handleCorn(){
        this.logger.debug('CRON ' );
 }

//_________________________________________________________________________________
// Interval:called repeatedly , depends when the server run

@Cron(CronExpression.EVERY_5_SECONDS,{name:"notifications"})

    handleInterval(){

        this.logger.debug('INTERVAL WITH CORN MMOMOSMF');
        const job = this.schedulerRegistry.getCronJob('notifications');

job.stop();
console.log(job.lastDate());
    }

//_________________________________________________________________________________
// Time out:called once

    @Timeout(5000)
 handleTimeout() {
  this.logger.debug('TIMEOUT');
}


}
