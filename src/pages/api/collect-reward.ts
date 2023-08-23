import { StrapiService } from '@/services/strapi.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { ticketIds, eventId, adminJwt } = req.body;

    try {
      const me = await StrapiService.getMe(adminJwt as string);

      const { events } = me;

      if (!events.includes(eventId)) {
        return res.status(400).json({ message: 'Unauthorized' });
      }

      for (let i = 0; i < ticketIds.length; i++) {
        const ticketId = ticketIds[i];
        const {
          data: {
            attributes: { isRewardCollected }
          }
        } = await StrapiService.getTicketById(process.env.STRAPI_API_TOKEN as string, ticketId);

        if (isRewardCollected) {
          return res.status(400).json({ message: 'Nagroda już odebrana' });
        }

        await StrapiService.changeIsRewardCollectedTicketStatus(process.env.STRAPI_API_TOKEN as string, ticketId, true);
      }

      return res.status(201).json({ message: 'Success' });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
