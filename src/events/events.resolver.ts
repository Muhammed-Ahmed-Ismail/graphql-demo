import { Args, Mutation, Query } from "@nestjs/graphql";
import { Event } from "./event.entity";
import { Resolver } from "@nestjs/graphql";
import { EventService } from "./events.service";
import { EventCreateInput } from "./input/event.create.input";

@Resolver(() => Event)
export class EventResolver {

    constructor(private eventService: EventService) { }

    @Query(() => [Event])
    async events(): Promise<Event[]> {
        return await this.eventService.findAll();
    }


    @Mutation(() => Event)
    async addEvent(@Args({ name: "eventCreateInput",type: () => EventCreateInput }) eventCreateInput: EventCreateInput): Promise<Event> {
        return this.eventService.addEvent(eventCreateInput);
    }
}