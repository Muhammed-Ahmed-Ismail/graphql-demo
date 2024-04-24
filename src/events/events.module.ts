import { Module } from '@nestjs/common';
import { EventResolver } from './events.resolver';
import { EventService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { User } from 'src/users/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Event,User])],
    providers:[EventResolver,EventService]
})
export class EventModule {}
