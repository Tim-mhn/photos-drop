import * as ExifReader from 'exifreader';

export async function getImageDate(buffer: Buffer) {
  const tags = await ExifReader.load(buffer);
  const dateString = tags?.DateCreated?.description;
  return dateString ? new Date(dateString) : new Date(Date.now());
}
