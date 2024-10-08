import { GlobalStyles as MUIGlobalStyles } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const inputGlobalStyles = (
    <MUIGlobalStyles
      styles={{
        '*': {
          boxSizing: 'border-box'
        },
        html: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          position: 'relative',
          WebkitOverflowScrolling: 'touch'
        },
        body: {
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%'
        },
        '#root': {
          width: '100%',
          height: '100%'
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none'
            }
          }
        },
        a: {
          textDecoration: 'none'
        },
        img: {
          display: 'block',
          maxWidth: '100%'
        },
        ul: {
          margin: 0,
          padding: 0
        },
        p: {
          margin: 0,
          padding: 0
        }
      }}
    />
  );

  return inputGlobalStyles;
}
