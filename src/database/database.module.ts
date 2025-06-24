import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = Number(configService.get<string>('DB_PORT')) || 3306;
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_NAME');
        const sync = configService.get<string>('DB_SYNC', 'false') === 'true';

        console.log({ host, port, username, password, database, sync });

        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          migrations: [__dirname + '/../migrations/*.{js,ts}'],
          synchronize: sync,
          migrationsRun: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
