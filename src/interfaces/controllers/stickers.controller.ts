import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateStickerUseCase } from '@application/use-cases/create-sticker.use-case';
import { GetStickerByIdUseCase } from '@application/use-cases/get-sticker-by-id.use-case';
import { GetAllStickersUseCase } from '@application/use-cases/get-all-stickers.use-case';
import { CreateStickerDto } from '@application/dtos/create-sticker.dto';
import { StickerDto } from '@application/dtos/sticker.dto';

@ApiTags('stickers')
@Controller('api/stickers')
export class StickersController {
  constructor(
    private readonly createStickerUseCase: CreateStickerUseCase,
    private readonly getStickerByIdUseCase: GetStickerByIdUseCase,
    private readonly getAllStickersUseCase: GetAllStickersUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sticker' })
  @ApiResponse({ status: 201, description: 'Sticker created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createSticker(@Body() dto: CreateStickerDto): Promise<StickerDto> {
    try {
      return await this.createStickerUseCase.execute(dto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create sticker',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all stickers' })
  @ApiResponse({ status: 200, description: 'List of all stickers' })
  async getAllStickers(): Promise<StickerDto[]> {
    try {
      return await this.getAllStickersUseCase.execute();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch stickers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sticker by ID' })
  @ApiResponse({ status: 200, description: 'Sticker found' })
  @ApiResponse({ status: 404, description: 'Sticker not found' })
  async getStickerById(@Param('id') id: string): Promise<StickerDto> {
    try {
      const sticker = await this.getStickerByIdUseCase.execute(id);
      
      if (!sticker) {
        throw new HttpException('Sticker not found', HttpStatus.NOT_FOUND);
      }

      return sticker;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch sticker',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}