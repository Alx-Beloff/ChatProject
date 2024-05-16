import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardFooter } from 'react-bootstrap';
import type { SpotType } from '../../types/spotType';

type SpotItemProps = {
  spot: SpotType;
};

export default function OneSpotCard({ spot }: SpotItemProps): JSX.Element {
  return (
    <div>
      <Card sx={{ width: 300, maxHeight: 500 }} style={{ borderRadius: '20px' }}>
        <CardMedia sx={{ height: 140 }} image={spot.img} title="green iguana" />
        <CardContent style={{ maxHeight: '300px', overflowY: 'auto', paddingBottom: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {spot.name}
          </Typography>
          <Typography style={{ marginBottom: '10px', marginTop: '10px' }}>
            <div
              style={{
                borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
                width: '90%',
                margin: 'auto',
              }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="left">
            {spot.description}
          </Typography>
        </CardContent>
        <CardFooter
          style={{
            borderTop: '1px solid rgba(128, 128, 128, 0.2)',
            width: '90%',
            margin: 'auto',
            marginTop: '10px',
            height: '40px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          }}
        >
          {spot.address}
        </CardFooter>
      </Card>
    </div>
  );
}
