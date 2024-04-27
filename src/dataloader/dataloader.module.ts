import { Module } from '@nestjs/common';
import { DataLoaderService } from './dataloader.service';
import { EventService } from 'src/events/events.service';
import { EventModule } from 'src/events/events.module';

@Module({
    imports:[EventModule],
    providers: [DataLoaderService],
    exports: [DataLoaderService]
})
export class DataloaderModule { }
