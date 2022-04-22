import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Container, Typography } from '@material-ui/core';
import banner from '../../images/banner2.jpg';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: `url(${banner})`
    },
    bannerContent: {
        height: 500,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent:"space-around"
    },
    tagline: {
        display:"flex",
        height: "60%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
}));

const Banner = () => {

    const classes = useStyles()

  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom: 18,
                    fontFamily: "Montserrat",
                    color: "#40DFEF"
                }}>
                    Welcome to KryptoVerse!
                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontFamily: 'Montserrat',
                    fontSize: 20
                }}>
                    Get all the info regarding your favourite Crypto Currencies.
                </Typography>
            </div>
            <Carousel />

        </Container>
    </div>
  )
}

export default Banner