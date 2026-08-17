import { Controller,Get, Body, Logger, Query } from '@nestjs/common';
import {PuppeterService} from './puppter.service'

@Controller('puppter')
export class PuppterController {
  constructor(private readonly puppterService: PuppeterService) {}
  private log=new Logger(PuppterController.name)
  @Get('pdf')
  makePdf(@Query("url") url:string){
   try{
    console.log(url)
     this.log.verbose("all is ok")
     return this.puppterService.getPageContent(url)

   }catch(error){
this.log.error("error in url",error)
   }
  }
}
