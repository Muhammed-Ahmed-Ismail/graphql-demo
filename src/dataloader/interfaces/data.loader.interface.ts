import DataLoader from "dataloader";
import { Event } from "src/events/event.entity";
export interface IDataloaders {
    eventsDataloader: DataLoader<number, Event>
}