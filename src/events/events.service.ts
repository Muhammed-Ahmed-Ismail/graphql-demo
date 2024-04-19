import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "./event.entity";

@Injectable()
export class EventService {

    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) { }

    public async findAll():Promise<Event[]>{
        return await this.eventRepository.find();
    }
}