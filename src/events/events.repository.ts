import { DataSource, Repository } from "typeorm";
import { Event } from "./event.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventRepository extends Repository<Event> {
    constructor(private dataSource: DataSource) {
        super(Event, dataSource.createEntityManager());
    }

    public async findEventsByUserIds(userIds: readonly number[]): Promise<Event[]> {
       const events = await this.createQueryBuilder("event")
            .innerJoinAndSelect("event.attendees", 'user', 'user.id in (:...ids)', { ids: userIds })
            .getMany()
        
        console.log(events);
        
        return events
    }
}