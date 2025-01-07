// import React, { createContext, Dispatch, useReducer } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme/theme';
import Users from './pages/Users';
import UserRecipes from './pages/UserRecipes';
import { UsersProvider } from './state/usersContext';

function App() {
    return (
        <UsersProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<UserRecipes />} />
                        <Route path="/" element={<Navigate to="/users" replace />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </UsersProvider>
    );
}

export default App;
