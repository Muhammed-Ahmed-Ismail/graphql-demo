import { ArgumentsHost, Catch, ConflictException, HttpException } from "@nestjs/common";
import { GqlArgumentsHost, GqlExceptionFilter } from "@nestjs/graphql";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class GlobalTypeOrmExceptionHandler implements GqlExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        
        const gqlHost = GqlArgumentsHost.create(host);

        switch(exception.code){
            case '23505':
                return new ConflictException(exception.detail)
    
            

        }

        return exception;
    }
    
}