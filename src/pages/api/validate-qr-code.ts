import { StrapiService } from '@/services/strapi.service';
import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

const CryptoJS = require('crypto-js');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { encryptedAddress, eventId } = req.body;
    try {
      const {
        data: {
          attributes: { key }
        }
      } = await StrapiService.getEncryptionKey(process.env.STRAPI_API_TOKEN as string);

      const bytes = CryptoJS.AES.decrypt(encryptedAddress, key);
      const address = bytes.toString(CryptoJS.enc.Utf8).toLowerCase();

      if (!address) {
        return res.status(400).json({ message: 'Błędny kod QR' });
      }

      await axios.post(`${process.env.CUSTOMER_API_URL}/assign-ticket-to-address`, {
        address,
        eventId
      });

      const response = await StrapiService.getNotCollectedRewardTicketsByHolderAddress(
        process.env.STRAPI_API_TOKEN as string,
        address,
        eventId
      );
      const { data } = response;

      if (!data) {
        return res.status(400).json({ message: 'Brak nagród' });
      }

      const mappedTickets = data.map(ticketWrapper => {
        const {
          id,
          attributes: { title }
        } = ticketWrapper;
        return {
          id,
          title
        };
      });

      return res.status(201).json(mappedTickets);
    } catch (e: any) {
      console.error(e);
      const message = e?.response?.data?.message;
      return res.status(500).json({ message: message || 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
