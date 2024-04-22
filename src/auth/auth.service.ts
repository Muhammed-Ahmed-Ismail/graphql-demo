import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {

    public async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
}