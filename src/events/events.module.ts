import { Module } from '@nestjs/common';
import { EventResolver } from './events.resolver';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Event])],
    providers:[EventResolver,EventService]
})
export class EventModule {}
