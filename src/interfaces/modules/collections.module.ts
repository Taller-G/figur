import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsController } from '../controllers/collections.controller';
import { CreateCollectionUseCase } from '@application/use-cases/create-collection.use-case';
import { AddStickerToCollectionUseCase } from '@application/use-cases/add-sticker-to-collection.use-case';
import { CollectionRepository } from '@domain/repositories/collection.repository';
import { StickerRepository } from '@domain/repositories/sticker.repository';
import { TypeOrmCollectionRepository } from '@infrastructure/repositories/typeorm-collection.repository';
import { CollectionDbEntity } from '@infrastructure/database/entities/collection.entity';
import { CollectedStickerDbEntity } from '@infrastructure/database/entities/collected-sticker.entity';
import { StickersModule } from './stickers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionDbEntity, CollectedStickerDbEntity]),
    StickersModule,
  ],
  controllers: [CollectionsController],
  providers: [
    CreateCollectionUseCase,
    AddStickerToCollectionUseCase,
    {
      provide: CollectionRepository,
      useClass: TypeOrmCollectionRepository,
    },
    {
      provide: TypeOrmCollectionRepository,
      useFactory: (collectionRepo, collectedStickerRepo) =>
        new TypeOrmCollectionRepository(collectionRepo, collectedStickerRepo),
      inject: [
        TypeOrmModule.getRepositoryToken(CollectionDbEntity),
        TypeOrmModule.getRepositoryToken(CollectedStickerDbEntity),
      ],
    },
  ],
})
export class CollectionsModule {}