import { Args, Int, Mutation, Query } from "@nestjs/graphql";
import { Event } from "./event.entity";
import { Resolver } from "@nestjs/graphql";
import { EventService } from "./events.service";
import { EventCreateInput } from "./input/event.create.input";
import { AddAttendeeInput } from "./input/event.add.attendee";

@Resolver(() => Event)
export class EventResolver {

    constructor(private eventService: EventService) { }

    @Query(() => [Event])
    async events(): Promise<Event[]> {
        return await this.eventService.findAll();
    }


    @Query(()=>[Event])
    async eventsByAttendees(@Args({name:"attendeeIds",type:()=> [Int]}) attendeeIds:number[]): Promise<Event[]>{
        return await this.eventService.findEventsByAttendees(attendeeIds)
    }

    @Mutation(() => Event)
    async addEvent(@Args({ name: "eventCreateInput",type: () => EventCreateInput }) eventCreateInput: EventCreateInput): Promise<Event> {
        return this.eventService.addEvent(eventCreateInput);
    }

    @Mutation(()=>Event)
    async addAttendee(@Args({name:"addAttendeeInput"}) addAttendeeInput:AddAttendeeInput){
        return this.eventService.addAttendee(addAttendeeInput);
    }
}