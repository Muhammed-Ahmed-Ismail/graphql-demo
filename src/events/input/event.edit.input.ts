import { InputType, PartialType } from "@nestjs/graphql";
import { EventCreateInput } from "./event.create.input";

@InputType()
export class EventEditInput extends PartialType(EventCreateInput) {

}