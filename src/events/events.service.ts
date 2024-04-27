import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";
import { EventCreateInput } from "./input/event.create.input";
import { AddAttendeeInput } from "./input/event.add.attendee";
import { User } from "src/users/user.entity";
import { EventRepository } from "./events.repository";
import e from "express";

@Injectable()
export class EventService {

    constructor(private eventRepository: EventRepository, @InjectRepository(User) private userRepository: Repository<User>) { }

    public async findAll(): Promise<Event[]> {
        return await this.eventRepository.find();
    }

    public async addEvent(event: EventCreateInput): Promise<Event> {
        return this.eventRepository.save(event)
    }

    public async addAttendee(addAttendeeIbput: AddAttendeeInput): Promise<Event> {
        const eventObject = await this.eventRepository.findOneByOrFail({
            id: addAttendeeIbput.eventId
        })

        const userObject = await this.userRepository.findOneByOrFail({
            id: addAttendeeIbput.userId
        })

        const attendees = await eventObject.attendees
        attendees.push(userObject);

        return await this.eventRepository.save(eventObject);
    }

    public async findEventsByAttendees(attendeeIds: number[]): Promise<Event[] | any[]> {
        const events = await this.eventRepository.findEventsByUserIds(attendeeIds)
        const mappedEvents = await this._mapEventsToAttendees(events, attendeeIds)
        console.log('{{{{{{{{{{{{{{{mappedEvents}}}}}}}}}}}}}}}');
        console.log(mappedEvents);

        return mappedEvents

    }

    private async _mapEventsToAttendees(events: Event[], attendeeIds: number[]) {
        const eventUsersMap = new Map<string, number[]>();
        events.forEach(async (event) => {
            eventUsersMap.set(event.id.toString() , (await event.attendees).map((user) => user.id)) || [];
        })
        return attendeeIds.map(
            (id: number) => events.filter((event) => eventUsersMap.get(event.id.toString()).includes(id))
        );

    }
}