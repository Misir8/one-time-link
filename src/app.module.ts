import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkModule } from './link/link.module';

// В реальном проекте я вынес бы конфиг в ormConfig
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'onetime_link_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
