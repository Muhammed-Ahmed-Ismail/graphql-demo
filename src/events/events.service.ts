import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";
import { EventCreateInput } from "./input/event.create.input";
import { AddAttendeeInput } from "./input/event.add.attendee";
import { User } from "src/users/user.entity";
import e from "express";

@Injectable()
export class EventService {

    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>,@InjectRepository(User) private userRepository:Repository<User>) { }

    public async findAll():Promise<Event[]>{
        return await this.eventRepository.find();
    }

    public async addEvent(event:EventCreateInput):Promise<Event>{
        return this.eventRepository.save(event)
    }

    public async addAttendee(addAttendeeIbput:AddAttendeeInput): Promise<Event>{
        const eventObject = await this.eventRepository.findOneByOrFail({
            id:addAttendeeIbput.eventId
        })

        const userObject = await this.userRepository.findOneByOrFail({
            id:addAttendeeIbput.userId
        })
        
        const attendees = await eventObject.attendees
        attendees.push(userObject);

        return await this.eventRepository.save(eventObject);
    }
}