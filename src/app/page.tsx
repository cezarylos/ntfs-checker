import { redirect } from 'next/navigation';
import React, { ReactElement } from 'react';

export const metadata = {
  title: 'RealBrain'
};

export default async function Home(): Promise<ReactElement> {
  redirect('/events');
  return <></>;
}
