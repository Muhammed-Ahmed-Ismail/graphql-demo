import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./users.service";
import { UserResolver } from "./user.resolver";
import { AuthModule } from "src/auth/auth.module";

@Module({
    providers:[UserService,UserResolver],
    imports:[TypeOrmModule.forFeature([User]),AuthModule]
})
export class UsersModule {}