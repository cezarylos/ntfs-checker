'use client';

import { ColorModeContext } from '@/app/app-layout';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import * as React from 'react';

export default function MediaCard({ heading, text }: { heading: string; text: string }) {
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Card>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        test
      </IconButton>
      <Image
        alt="Random image"
        src="https://source.unsplash.com/random"
        width={640}
        height={480}
        style={{
          maxWidth: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          GULA {heading}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
