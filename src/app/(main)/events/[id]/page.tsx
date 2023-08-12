import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { ReactElement } from 'react';

export default function Event({ params: { id } }: { params: { id: string } }): ReactElement {
  return (
    <Box sx={{ margin: 'auto' }}>
      <Link href={`/events/${id}/scanner`}>
        <Button variant={'contained'} color={'primary'} sx={{ width: '100%', maxWidth: '500px' }}>
          <Typography variant={'h3'} textAlign={'center'} p={2}>
            SKANUJ QR KOD
          </Typography>
        </Button>
      </Link>
    </Box>
  );
}
