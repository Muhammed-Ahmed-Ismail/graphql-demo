import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Event{
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data:Date
}