import ScannerComponent from '@/components/scanner/scanner';
import { ReactElement } from 'react';
import * as React from 'react';

export default function Scanner({ params: { id } }: { params: { id: string } }): ReactElement {
  return <ScannerComponent id={id} />;
}
