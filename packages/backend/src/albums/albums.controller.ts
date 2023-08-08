import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AlbumsRepository, CreateAlbumUseCase } from './create-album.use-case';
import { GetUserAlbumsUseCase } from './get-user-albums.use-case';
import { Request } from 'express';
import { getCurrentUserId } from '../auth';
import { AlbumListDTO, CreateAlbumDTO } from '@shared/dtos';
import { Album } from './album';
import { ALBUMS_REPOSITORY_TOKEN } from './providers';

@Controller('albums')
export class AlbumsController {
  constructor(
    private createAlbumsUseCase: CreateAlbumUseCase,
    private getUserAlbumsUseCase: GetUserAlbumsUseCase,
    @Inject(ALBUMS_REPOSITORY_TOKEN) private albumsRepo: AlbumsRepository,
  ) {}

  @Post('')
  async createAlbum(@Body() { name }: CreateAlbumDTO, @Req() req: Request) {
    const currentUserId = await getCurrentUserId(req);

    await this.createAlbumsUseCase.execute({
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
    return userAlbums.map(({ creationDate, name, id, photosCount }) => ({
      creationDate: creationDate.toISOString(),
      name,
      id,
      photosCount,
    }));
  }

  @Get(':albumId')
  async getAlbumById(
    @Req() req: Request,
    @Param('albumId') albumId: string,
  ): Promise<Album> {
    return this.albumsRepo.getAlbumById(albumId);
  }
}
