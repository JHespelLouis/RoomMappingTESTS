import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function MapList() {
  return (
    <ImageList sx={{ width: 700, height: 1000 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Nombre de scans : {itemData.length}</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            srcSet={item.img}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`open ${item.title} in another tab`}
                onClick={() => window.open(item.img, '_blank')}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 1',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 2',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 3',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 4',
    cols: 2,
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 5',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 6',
  },
  {
    img: require('../assets/parcelle.png'),
    title: 'Plan 7',
  },
];
