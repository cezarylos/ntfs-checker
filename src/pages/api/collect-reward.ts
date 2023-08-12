import { StrapiService } from '@/services/strapi.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { ticketIds } = req.body;

    try {
      for (let i = 0; i < ticketIds.length; i++) {
        const ticketId = ticketIds[i];
        await StrapiService.changeIsRewardCollectedTicketStatus(process.env.STRAPI_API_TOKEN as string, ticketId, true);
      }

      return res.status(201).json({ message: 'Success' });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
