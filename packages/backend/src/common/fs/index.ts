import { readFile, writeFile } from 'fs/promises';

export function writeJSONFile<I = any>(filename: string, data: I) {
  return writeFile(filename, JSON.stringify(data));
}

export async function readJSONFile<O = any>(filename: string) {
  const data = await readFile(filename, {
    encoding: 'utf-8',
  });

  return JSON.parse(data) as O;
}

export const randomId = () => (Math.random() + 1).toString(36).substring(2);
