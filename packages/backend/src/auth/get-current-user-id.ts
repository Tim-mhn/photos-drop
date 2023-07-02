import axios from 'axios';
import { Request } from 'express';

export async function getCurrentUserId(req: Request) {
  const { sub } = (
    await axios.get<{ sub: string }>(
      'https://dev-jajajfbc.us.auth0.com/userinfo',
      {
        headers: {
          Authorization: `Bearer ${req.auth.token}`,
        },
      },
    )
  ).data;

  return sub;
}
