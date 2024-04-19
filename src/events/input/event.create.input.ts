import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class EventCreateInput {
    @Field()
    name:string
    @Field()
    date:Date
}