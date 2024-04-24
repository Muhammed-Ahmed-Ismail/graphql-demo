import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddAttendeeInput{
    @Field()
    userId:number;
    @Field()
    eventId:number;
}