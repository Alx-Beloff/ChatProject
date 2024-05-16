import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardFooter } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { SpotType } from '../../types/spotType';
import { useAppSelector } from '../../redux/hooks';

type SpotItemProps = {
  spot: SpotType;
};
export default function OneSpotCard({ spot }: SpotItemProps): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);
  const navigate = useNavigate();
  return (
    <div>
      <Card sx={{ width: 300, maxHeight: 700 }} style={{ borderRadius: '20px' }}>
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
        {user.status === 'logged' && user.role === 'admin' && (
          <div className="d-flex m-2 justify-content-center">
            <Button
              className="m-1"
              variant="primary"
              style={{
                height: '40px',
                fontSize: '15px',
                borderColor: 'transparent',
                borderRadius: '20px',
              }}
            >
              Изменить
            </Button>
            <Button
              className="m-1"
              variant="danger"
              style={{
                height: '40px',
                fontSize: '15px',
                borderColor: 'transparent',
                borderRadius: '20px',
              }}
            >
              Удалить
            </Button>
            <Button
              className="m-1"
              variant="dark"
              style={{
                height: '40px',
                width: '80px',
                fontSize: '15px',
                borderColor: 'transparent',
                borderRadius: '20px',
              }}
              onClick={() => navigate(`/qr/${spot.id}`)}
            >
              QR
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
