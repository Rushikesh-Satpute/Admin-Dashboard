import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Clear the 'token' cookie by setting its expiration time to the past
  res.setHeader('Set-Cookie', [
    `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict; Secure=${process.env.NODE_ENV === 'production' ? 'true' : 'false'}`,
  ]);

  // Send a JSON response indicating successful logout
  return res.status(200).json({ message: 'Logged out successfully' });
}
