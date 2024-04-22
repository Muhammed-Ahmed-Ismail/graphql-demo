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
    @Column()
    name:string

    @Field()
    @Column({unique:true})
    email:string

    @Column()
    password:string

    @ManyToMany(()=>Event,(event)=>event.attenders)
    @JoinTable()
    events:Event[]
}