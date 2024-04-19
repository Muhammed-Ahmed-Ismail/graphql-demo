import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Event{
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable:true})
    @Column({nullable:true})
    data:Date

    @Field()
    @Column()
    name:string
}