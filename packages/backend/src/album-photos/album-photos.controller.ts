import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlbumPhotosService } from './add-photos-to-album.use-case';
import { AlbumImages } from './album-image';

@Controller('albums/:albumId/photos')
export class AlbumPhotosController {
  constructor(private albumPhotosService: AlbumPhotosService) {}

  //todo: add logic to prevent adding on album not owned by user
  @Post('add')
  async addPhotosToAlbum(
    @Param('albumId') albumId: string,
    @Body() { photosIds }: { photosIds: string[] },
  ) {
    await this.albumPhotosService.addPhotosToAlbum({
      albumId,
      photosIds,
    });
  }

  //todo: need to include date ?
  @Get('')
  getAlbumPhotos(@Param('albumId') albumId: string): Promise<AlbumImages> {
    return this.albumPhotosService.getAlbumPhotos(albumId);
  }
}
