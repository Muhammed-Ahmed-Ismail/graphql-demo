import { Injectable } from "@nestjs/common";
import { IDataloaders } from "./interfaces/data.loader.interface";
import * as DataLoader from 'dataloader';
import { Event } from "src/events/event.entity";
import { EventService } from "src/events/events.service";

@Injectable()
export class DataLoaderService {
    constructor(private eventService:EventService){}
    public getLoaders():IDataloaders{
        const eventsDataloader = this.getEventsDataLoader();

        return {
            eventsDataloader
        }
    }

    private getEventsDataLoader():DataLoader<number,Event>{
        return new DataLoader<number,Event>(
            async (keys: readonly number[])=> await this.eventService.findEventsByAttendees(keys as number[])
        )
    }
}