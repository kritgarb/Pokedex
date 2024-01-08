import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import api from '../../../services/api';
import Logo from './poke.png';
import Charmander from './charmander.png';
import './index.css';

const Home = () => {
    const [list, setList] = useState([]);
    const [inputValue, setValueInput] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/pokemon/${inputValue}`);
    };

    useEffect(() => {
        api.get().then(({ data }) => {
            const listData = data.results.map((item) => ({ ...item, label: item.name }));
            setList(listData);
        });
    }, []);

    const buttonStyles = {
        variant: 'contained',
        color: 'error',
        className: 'buttons',
    };

    const icons = {
        pets: <PetsIcon />,
        fire: <LocalFireDepartmentIcon />,
        reset: <FormatColorResetIcon />,
    };

    return (
        <>
            <Box className="header">
                <img className="logoPokemon" src={Logo} alt="Pokemon-Logo" width="10%" />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 'auto',
                        p: 1,
                        mr: 1,
                        borderRadius: 1,
                    }}
                    component="form"
                    onSubmit={handleSubmit}
                    className="searchBox"
                >
                    <Typography variant="h5">Pokémon:</Typography>
                    <Autocomplete
                        id="combo-box-demo"
                        options={list}
                        sx={{ width: '100%' }}
                        onChange={(e, newEvent) => setValueInput(newEvent.name)}
                        renderInput={(params) => (
                            <TextField id="filled-basic" label="QUAL O SEU POKÉMON FAVORITO?" variant="standard" {...params} sx={{ width: '100%' }} />
                        )}
                    />
                    <Button {...buttonStyles} type="submit">
                        <SearchIcon />
                    </Button>
                </Box>
            </Box>

            <div className="home">
                <div className="body">
                    <div className="div1">
                        <h2>Charmander</h2>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {Object.keys(icons).map((key) => (
                                <Button key={key} startIcon={icons[key]} {...buttonStyles} sx={{ mt: 1 }}>
                                    {key === 'pets' && 'Categoria: Lagarto'}
                                    {key === 'fire' && 'Evolui para: Charmeleon'}
                                    {key === 'reset' && 'Fraqueza: Água'}
                                </Button>
                            ))}
                            <Paper sx={{ bgcolor: 'transparent', borderRadius: 5, margin: 10 }} className="paper">
                                <Typography variant="h6" gutterBottom component="div" sx={{ m: 2 }} className="subTitulo">
                                    Charmander é um Pokémon do tipo fogo e um dos Pokémons capturáveis do jogo Pokémon Go.
                                </Typography>
                            </Paper>
                        </Box>
                    </div>

                    <div className="div2">
                        <img src={Charmander} alt="Pokemon-Logo" width="60%" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
