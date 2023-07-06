import React, { useEffect, useState } from 'react';
import './home.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors';

export default function Home1() {
    const [data, setData] = useState([]);
    const [item, setData1] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        axios
            .get('https://api.chucknorris.io/jokes/categories')
            .then((res) => {
                console.log('Getting data from:', res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get('https://api.chucknorris.io/jokes/random?category=')
            .then((res) => {
                console.log('Getting data from:', res.item);
                setData1(res.item);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleCardClick = (category) => {
        setSelectedCategory(category);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div style={{ background: 'linear-gradient(to  right, #3533cd, #000000)' }}>
            <div className='container'>
                <div>
                    <h1 className='heading'>Chuck Norris</h1>
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <Grid container spacing={2} justifyContent='center'>
                        {data.map((category, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
                                    onClick={() => handleCardClick(category)}
                                >
                                    <Card sx={{ textTransform: 'capitalize', minWidth: 250, height: 150, backgroundColor: 'white' }}>
                                        <CardContent>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }} color='text.secondary' gutterBottom>
                                                {category}
                                            </Typography>
                                            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                                Unlimited Jokes On {category}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth='md' fullWidth>
                    <DialogTitle sx={{ textTransform: 'capitalize', textAlign:'center'}} >
                        {selectedCategory}
                        <IconButton
                            aria-label="close"
                            sx={{ position: 'absolute', right: 8, top: 8 }}
                            onClick={handleCloseDialog}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent dividers>
                    {/* {data1.map((item, index) => ( */}
                        <Typography variant='body1'>Card content goes here...{item.message}</Typography>
                    {/* ))} */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} sx={{backgroundColor: 'blue',color:'black', fontWeight:'bold'}} >
                            Next joke
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
