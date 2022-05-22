import React, {FC, useEffect} from 'react';
import AppRouter from "./components/AppRouter/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import {Layout} from "antd";
import './App.css';
import {useActions} from "./hooks/useActions";

const App:FC = () => {
    const {setIsAuth, getProfile} = useActions();

    useEffect(() => {
        if(localStorage.getItem('auth')) {
            getProfile(localStorage.getItem('login' || '') || '')
            setIsAuth(true);
        }
    }, [])

    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter />
            </Layout.Content>
        </Layout>
    );
};

export default App;
