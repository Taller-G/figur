import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCollectionUseCase } from '@application/use-cases/create-collection.use-case';
import { AddStickerToCollectionUseCase } from '@application/use-cases/add-sticker-to-collection.use-case';
import { CreateCollectionDto } from '@application/dtos/create-collection.dto';
import { AddStickerToCollectionDto } from '@application/dtos/add-sticker-to-collection.dto';
import { CollectionDto } from '@application/dtos/collection.dto';

@ApiTags('collections')
@Controller('api/collections')
export class CollectionsController {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
    private readonly addStickerToCollectionUseCase: AddStickerToCollectionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiResponse({ status: 201, description: 'Collection created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createCollection(@Body() dto: CreateCollectionDto): Promise<CollectionDto> {
    try {
      return await this.createCollectionUseCase.execute(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create collection',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/stickers')
  @ApiOperation({ summary: 'Add sticker to collection' })
  @ApiResponse({ status: 200, description: 'Sticker added to collection successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'Collection or sticker not found' })
  async addStickerToCollection(
    @Param('id') collectionId: string,
    @Body() dto: Omit<AddStickerToCollectionDto, 'collectionId'>,
  ): Promise<CollectionDto> {
    try {
      const fullDto: AddStickerToCollectionDto = {
        ...dto,
        collectionId,
      };
      return await this.addStickerToCollectionUseCase.execute(fullDto);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        error.message || 'Failed to add sticker to collection',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}