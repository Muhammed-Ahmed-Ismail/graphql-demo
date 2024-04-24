import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { UserCreateInput } from "./input/user.create.input";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private authService: AuthService) { }

    public findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    public async addUser(input: UserCreateInput): Promise<User> {
        let user: User = new User();
        user.email = input.email;
        user.firstName = input.firstName;
        user.lastName = input.lastName;

        user.password = await this.authService.hashPassword(input.password)
        return this.userRepository.save(user);
    }
}