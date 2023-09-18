import { StrapiService } from '@/services/strapi.service';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { eventId, adminJwt } = req.body;

    try {
      const me = await StrapiService.getMe(adminJwt as string);

      const { events } = me;
      const eventsIds = events.map(event => Number(event.id));

      if (!eventsIds.includes(Number(eventId))) {
        return res.status(400).json({ message: 'Unauthorized' });
      }

      const {
        meta: {
          pagination: { total }
        }
      } = await StrapiService.getEventRewardsToCollectLeft(process.env.STRAPI_API_TOKEN as string, eventId);

      return res.status(201).json({ rewardsLeft: total });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: 'Unauthorized' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
