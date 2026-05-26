import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { StickersModule } from './modules/stickers.module';
import { CollectionsModule } from './modules/collections.module';
import { AuthModule } from './modules/auth.module';
import { HealthController } from './controllers/health.controller';

@Module({
  imports: [
    // Serve Angular frontend
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      exclude: ['/api*'],
    }),
    DatabaseModule,
    StickersModule,
    CollectionsModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}