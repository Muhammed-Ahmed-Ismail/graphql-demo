import { Query } from "@nestjs/graphql";
import { Event } from "./event.entity";
import { Resolver } from "@nestjs/graphql";

@Resolver(of => Event)
export class EventResolver {
    @Query(()=>[Event])
    async events() : Promise<Event[]>{
        return [] as Event[];
    }
}