import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function MapList() {
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Nombre de scans : {itemData.length}</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );

  function handleImageLoad(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        consolr.log('Image loaded');
    };
    img.onerror = () => {
        console.log('Image load failed');
    };
  }
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
    cols: 2,
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
    cols: 2,
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
    rows: 2,
    cols: 2,
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
  },
  {
    img: './assets/icon.png',
    title: 'null',
    author: 'null',
    cols: 2,
  },
];