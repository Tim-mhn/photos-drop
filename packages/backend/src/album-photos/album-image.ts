import { Image } from '../../../shared/src';

export type AlbumImage = Pick<Image, 'id' | 'url'>;

export type AlbumImages = AlbumImage[];
