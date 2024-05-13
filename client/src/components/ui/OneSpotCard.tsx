import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { SpotType } from '../../types/spotType';

type SpotItemProps = {
  spot: SpotType;
};

export default function OneSpotCard({ spot }: SpotItemProps): JSX.Element {
  return (
    <div>
      <Card sx={{ maxWidth: 300, maxHeight: 500 }}>
        <CardMedia sx={{ height: 140 }} image={spot.img} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {spot.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {spot.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{spot.address}</Button>
        </CardActions>
      </Card>
    </div>
  );
}
