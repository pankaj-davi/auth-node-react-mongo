import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { ReactComponent as AuthSvg } from '../../../assets/Images/SVG/undraw_cloud_hosting_7xb1.svg';
import Logo from '../../Logo';
import { useNavigate } from 'react-router-dom';

const AuthCard = ({ children, content }) => {
    const navigate = useNavigate();

    return (
        <Grid container>
            <Grid item xs={12} md={6} xl={6} xxl={6} sx={styles.imageGrid}>
                <AuthSvg />
            </Grid>
            <Grid  item xs={12} md={6} xl={6} xxl={6}>
                <Container   maxWidth="xs"  sx={styles.container}>
                    <Paper elevation={5} sx={styles.paper}>
                        <Box align="center">
                            <Logo />
                        </Box>
                        <Typography variant="h3" align="center" gutterBottom>
                            {content?.wlecomeText}
                        </Typography>
                        <Typography variant="caption" component="p" align="center" p={1}>
                            {content?.description}
                        </Typography>
                        {children}
                        <Divider sx={styles.divider} />
                        <Typography variant="body2" align="center">
                            {content?.redirect?.spanText}
                            <Box
                                component="span"
                                onClick={() => navigate(content?.redirect?.url)}
                                sx={styles.redirectBox}
                            >
                                {content?.redirect?.buttonText}
                            </Box>
                        </Typography>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

const styles = {
    imageGrid: {
        backgroundColor: 'primary.main',
        p: 10,
    },
    container: {
        display: { xs: 'block', md: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: 'auto', md: '100vh' },
    },
    paper: {
        p: '3rem',
        mt: { xs: '3rem' },
    },
    divider: {
        margin: '1rem 0',
    },
    redirectBox: {
        color: 'primary.main',
        cursor: 'pointer',
    },
};

export default AuthCard;
