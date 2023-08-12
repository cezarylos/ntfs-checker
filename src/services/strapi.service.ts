import { LoginFormInterface } from '@/app/login/page';
import { EventInterface } from '@/typings/event.interface';
import { LocalStorageItemsEnum } from '@/typings/localStorageItems.enum';
import { MeInterface } from '@/typings/me.interface';
import { StrapiArrayResponseInterface, StrapiResponseInterface } from '@/typings/strapiResponse.interface';
import { TicketInterface } from '@/typings/ticket.interface';

import axios from 'axios';

export const BASE_STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
const noLimitPagination = '&pagination[limit]=-1';

const filerFields = (fields: string[] = [], isFirstParam = true): string =>
  fields?.length
    ? `${isFirstParam ? '?' : '&'}${fields.map((field: string, idx: number) => `fields[${idx}]=${field}`).join('&')}`
    : '';

const getHeaders = (jwt: string) => ({
  Authorization: `Bearer ${jwt}`,
  'Content-Type': 'application/json'
});

const cacheOptions = {
  next: {
    revalidate: 60
  }
};

export class StrapiService {
  public static async getEventById(
    eventId: string,
    fields?: string[]
  ): Promise<StrapiResponseInterface<EventInterface>> {
    try {
      const res = await fetch(`${BASE_STRAPI_URL}/api/events/${eventId}${filerFields(fields)}`, { ...cacheOptions });
      return res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async getNotCollectedRewardTicketsByHolderAddress(
    jwt: string,
    holderAddress: string,
    eventId: string
  ): Promise<StrapiArrayResponseInterface<TicketInterface>> {
    try {
      const hasEventId = `&filters[event][id][$eq]=${eventId}`;
      const headers = getHeaders(jwt);
      const res = await fetch(
        `${BASE_STRAPI_URL}/api/tickets?filters[holderAddress][$eq]=${holderAddress.toLowerCase()}&filters[isRewardCollected][$eq]=false${hasEventId}${noLimitPagination}`,
        { headers, cache: 'no-cache' }
      );
      return res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async login({ email, password }: LoginFormInterface): Promise<void> {
    try {
      const response = await axios.post(`${BASE_STRAPI_URL}/api/auth/local`, {
        identifier: email,
        password
      });
      localStorage.setItem(LocalStorageItemsEnum.JWT, response.data.jwt);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async getMe(): Promise<MeInterface> {
    try {
      const jwt = localStorage.getItem(LocalStorageItemsEnum.JWT) as string;
      const headers = getHeaders(jwt);
      const response = await axios.get(
        `${BASE_STRAPI_URL}/api/users/me?populate[events][fields][0]=name&populate[events]&populate[events][filters][isCollab][$eq]=false`,
        { headers }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async getEncryptionKey(jwt: string): Promise<StrapiResponseInterface<{ key: string }>> {
    try {
      const headers = getHeaders(jwt);
      const res = await fetch(`${BASE_STRAPI_URL}/api/encrypt-key`, { headers, cache: 'no-cache' });
      return res.json();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public static async changeIsRewardCollectedTicketStatus(
    jwt: string,
    ticketId: number,
    status: boolean
  ): Promise<void> {
    try {
      const headers = getHeaders(jwt);
      const res = await axios.put(
        `${BASE_STRAPI_URL}/api/tickets/${ticketId}`,
        { data: { isRewardCollected: status } },
        { headers, ...cacheOptions }
      );
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }
}
