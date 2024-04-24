import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, Matches } from "class-validator";
import { Match } from "./decorators/password.match.decotator";

@InputType()
export class UserCreateInput {
    @Field()
    firstName:string

    @Field()
    lastName:string

    @Field()
    @IsEmail()
    email:string

    @Field()
    password:string

    @Field()
    @Match('password',{message:"ConfirmPAssword must match the provided passowrd"})
    confirmPassword:string
}