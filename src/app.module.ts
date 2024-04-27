import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataLoaderService } from './dataloader/dataloader.service';

@Module({
  imports: [ConfigModule.forRoot(), EventModule, UsersModule, AuthModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Event, User],
    synchronize: true,
    logging: true
    
  }),
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [DataloaderModule],
    useFactory: (dataloaderService: DataLoaderService) => {
      return {
        autoSchemaFile: true,
        context: () => ({
          loaders: dataloaderService.getLoaders(),
        }),
        playground:true
      };
    },
    inject: [DataLoaderService],
      
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
