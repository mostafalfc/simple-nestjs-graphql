import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import configuration from './config/configuration';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: async () => ({
        autoSchemaFile: join(process.cwd() + '/src/schema.gql'),
        installSubscriptionHandlers: true,
        sortSchema: true,
        playground: true,
        debug: configuration().debug,
        uploads: false,
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [],
      useFactory: async () => ({
        uri: configuration().database.uri,
      }),
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
