import { Module } from '@nestjs/common';
import { EventResolver } from './events.resolver';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { User } from 'src/users/user.entity';
import { EventRepository } from './events.repository';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[EventResolver,EventService,EventRepository],
    exports:[EventRepository,EventService]
})
export class EventModule {}
