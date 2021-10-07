import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, styled } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import drinkImage from '../images/drinkBackground.jpg';
import foodImage from '../images/foodBackground.jpeg';
import LowerMenu from '../components/LowerMenu';
import Header from '../components/header';

const images = [
  {
    url: foodImage,
    title: 'Explorar Comidas',
    width: '40%',
    dataTestid: 'explore-food',
    to: '/explorar/comidas',
  },
  {
    url: drinkImage,
    title: 'Explorar Bebidas',
    width: '50%',
    dataTestid: 'explore-drinks',
    to: '/explorar/bebidas',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 270,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ImageBackdrop = styled('span')(() => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // backgroundColor: theme.palette.common.black,
  opacity: 0.4,
}));

const ImageMarked = styled('span')(() => ({
  height: 3,
  width: 18,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
}));

// documentação: https://mui.com/pt/components/buttons/#loading-buttons

function Explorer() {
  const history = useHistory();
  return (
    <section>
      <Header name="Explorar" search={ false } />
      <Box sx={ { display: 'flex', flexWrap: 'wrap', minWidth: 200, width: '100%' } }>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={ image.title }
            data-testid={ image.dataTestid }
            onClick={ () => history.push(image.to) }
            style={ {
              width: image.width,
            } }
          >
            <ImageSrc style={ { backgroundImage: `url(${image.url})` } } />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="white"
                fontSize=""
                sx={ {
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                } }
              >
                <Box sx={ { fontSize: 28, m: 1 } }>{image.title}</Box>
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
      <LowerMenu />
    </section>
  );
}

export default Explorer;
