import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateAlbumUseCase } from './create-album.use-case';
import { GetUserAlbumsUseCase } from './get-user-albums.use-case';
import { Request } from 'express';
import { getCurrentUserId } from '../auth';

@Controller('albums')
export class AlbumsController {
  constructor(
    private createAlbumsUseCase: CreateAlbumUseCase,
    private getUserAlbumsUseCase: GetUserAlbumsUseCase,
  ) {}

  @Post('')
  async createAlbum(@Body() { name }: { name: string }, @Req() req: Request) {
    const currentUserId = await getCurrentUserId(req);

    return this.createAlbumsUseCase.execute({
      name,
      owner: { id: currentUserId },
    });
  }

  @Get('')
  async getUserAlbums(@Req() req: Request) {
    const currentUserId = await getCurrentUserId(req);

    const userAlbums = await this.getUserAlbumsUseCase.execute({
      id: currentUserId,
    });
    console.log(userAlbums);
    return userAlbums.map(({ creationDate, name, id }) => ({
      creationDate,
      name,
      id,
    }));
  }
}
