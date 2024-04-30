import { Args, Context, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { Query } from "@nestjs/graphql";
import { UserService } from "./users.service";
import { UserCreateInput } from "./input/user.create.input";
import { log } from "console";
import { IDataloaders } from "src/dataloader/interfaces/data.loader.interface";

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) { }

    @Query(() => [User])
    public async users(): Promise<User[]> {
        return await this.userService.findAll();
    }

    @Mutation(()=>User)
    public async addUser(@Args({name:"userCreateInput",type:() =>UserCreateInput}) userCreateInput:UserCreateInput){
        return await this.userService.addUser(userCreateInput);
    }

    @ResolveField()
    public fullName(@Parent() user:User):string{
        return user.firstName + ' ' + user.lastName
    }

    @ResolveField()
    public events(@Parent() user:User,@Context() { loaders }: { loaders: IDataloaders },){
        const {id} = user
        return loaders.eventsDataloader.load(id)
    }
}