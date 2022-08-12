import { 
    useState, 
    useEffect, 
  } from 'react';

import { useSearchParams } from "@remix-run/react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Sidebar from "~/components/sidebar";

import InstagramIcon from '@mui/icons-material/Instagram';

const appId = 448646527197070;
const redirectUri = 'https://the-awesome-sommerariel-site.netlify.app/instagram';

export default function instagramRoute(): JSX.Element  {

    useEffect (() => {


    }, []);

    const [searchParams] = useSearchParams();

    console.log({searchParams})

    const onSearch = () => {
        const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Button variant="contained" startIcon={<InstagramIcon />} onClick={onSearch}>Get your Public Info</Button>
            </Box>
        </>
    )
};