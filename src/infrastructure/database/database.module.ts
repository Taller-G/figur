import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StickerDbEntity } from './entities/sticker.entity';
import { CollectionDbEntity } from './entities/collection.entity';
import { CollectedStickerDbEntity } from './entities/collected-sticker.entity';
import { UserDbEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_URL || 'stickers.db',
      entities: [StickerDbEntity, CollectionDbEntity, CollectedStickerDbEntity, UserDbEntity],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([
      StickerDbEntity,
      CollectionDbEntity,
      CollectedStickerDbEntity,
      UserDbEntity,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}