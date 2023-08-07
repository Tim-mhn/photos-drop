import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateAlbumUseCase } from './create-album.use-case';
import { GetUserAlbumsUseCase } from './get-user-albums.use-case';
import { Request } from 'express';
import { getCurrentUserId } from '../auth';
import { AlbumListDTO, CreateAlbumDTO } from '@shared/dtos';

@Controller('albums')
export class AlbumsController {
  constructor(
    private createAlbumsUseCase: CreateAlbumUseCase,
    private getUserAlbumsUseCase: GetUserAlbumsUseCase,
  ) {}

  @Post('')
  async createAlbum(@Body() { name }: CreateAlbumDTO, @Req() req: Request) {
    const currentUserId = await getCurrentUserId(req);

    return this.createAlbumsUseCase.execute({
      name,
      owner: { id: currentUserId },
    });
  }

  @Get('')
  async getUserAlbums(@Req() req: Request): Promise<AlbumListDTO> {
    const currentUserId = await getCurrentUserId(req);

    const userAlbums = await this.getUserAlbumsUseCase.execute({
      id: currentUserId,
    });
    return userAlbums.map(({ creationDate, name, id }) => ({
      creationDate: creationDate.toISOString(),
      name,
      id,
    }));
  }
}
