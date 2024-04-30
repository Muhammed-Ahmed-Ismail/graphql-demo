import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Event{
    constructor(partial?: Partial<Event>) {
        Object.assign(this, partial);
      }
      
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({nullable:true})
    @Column({nullable:true})
    date:Date

    @Field()
    @Column()
    name:string

    @ManyToMany(()=>User,(user)=>user.events)
    attendees:Promise<User[]>
}