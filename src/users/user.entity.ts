import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/events/event.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({name:"users"})
export class User{
    @Field()
    @PrimaryGeneratedColumn()
    id:number

    @Field()
    @Column({default: "foo"})
    firstName:string

    @Field()
    @Column({default: "foo"})
    lastName:string

    @Field()
    @Column({unique:true})
    email:string

    @Column()
    password:string

    @Field(()=>[Event])
    @ManyToMany(()=>Event,(event)=>event.attendees)
    @JoinTable()
    events: Promise<Event[]>
}