import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StickersController } from '../controllers/stickers.controller';
import { CreateStickerUseCase } from '@application/use-cases/create-sticker.use-case';
import { GetStickerByIdUseCase } from '@application/use-cases/get-sticker-by-id.use-case';
import { GetAllStickersUseCase } from '@application/use-cases/get-all-stickers.use-case';
import { StickerRepository } from '@domain/repositories/sticker.repository';
import { TypeOrmStickerRepository } from '@infrastructure/repositories/typeorm-sticker.repository';
import { StickerDbEntity } from '@infrastructure/database/entities/sticker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StickerDbEntity])],
  controllers: [StickersController],
  providers: [
    CreateStickerUseCase,
    GetStickerByIdUseCase,
    GetAllStickersUseCase,
    {
      provide: StickerRepository,
      useClass: TypeOrmStickerRepository,
    },
    {
      provide: TypeOrmStickerRepository,
      useFactory: (repository) => new TypeOrmStickerRepository(repository),
      inject: [TypeOrmModule.getRepositoryToken(StickerDbEntity)],
    },
  ],
  exports: [StickerRepository],
})
export class StickersModule {}