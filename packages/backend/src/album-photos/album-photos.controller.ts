import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  AlbumPhotosService,
  UserUnauthorizedToEditAlbum,
} from './add-photos-to-album.use-case';
import { AlbumImages } from './album-image';
import { AddPhotosToAlbumDTO } from '../../../shared/src/dtos';
import { Request, Response } from 'express';
import { getCurrentUserId } from '../auth';

@Controller('albums/:albumId/photos')
export class AlbumPhotosController {
  constructor(private albumPhotosService: AlbumPhotosService) {}

  @Post('add')
  async addPhotosToAlbum(
    @Param('albumId') albumId: string,
    @Body() { photosIds }: AddPhotosToAlbumDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = await getCurrentUserId(req);

      await this.albumPhotosService.addPhotosToAlbum({
        albumId,
        photosIds,
        userId,
      });
    } catch (err) {
      this._returnApiErrorResponse(res, err);
    }
  }

  private _returnApiErrorResponse(res: Response, err: Error) {
    if (err instanceof UserUnauthorizedToEditAlbum) {
      return res.status(HttpStatus.FORBIDDEN).json(err.message);
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err.message);
  }

  //todo: need to include date ?
  @Get('')
  getAlbumPhotos(@Param('albumId') albumId: string): Promise<AlbumImages> {
    return this.albumPhotosService.getAlbumPhotos(albumId);
  }
}
