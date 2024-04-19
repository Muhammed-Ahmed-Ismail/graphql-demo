import { Query } from "@nestjs/graphql";
import { Event } from "./event.entity";
import { Resolver } from "@nestjs/graphql";
import { EventService } from "./events.service";

@Resolver(of => Event)
export class EventResolver {

    constructor(private eventService:EventService){}
    @Query(()=>[Event])
    async events() : Promise<Event[]>{
        return await this.eventService.findAll();
    }

    
}