import { Request } from 'express';

export async function getCurrentUserId(req: Request) {
  return req.auth.payload.sub;
}
