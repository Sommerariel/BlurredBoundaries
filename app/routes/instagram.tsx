import { 
    useState, 
    useEffect, 
  } from 'react';

import { useSearchParams } from "@remix-run/react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Sidebar from "~/components/sidebar";

import InstagramIcon from '@mui/icons-material/Instagram';

const appId = '448646527197070';
const appS = '0e8ba0033b150898c74fd8996d6a17a1';
const redirectUri = 'https://the-awesome-sommerariel-site.netlify.app/instagram';

export default function instagramRoute(): JSX.Element  {
    const [isReady, setIsReady] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [searchParams] = useSearchParams();

    console.log("instacode", searchParams.get('code'))

    const getToken = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                client_id: appId, 
                client_secret: appS, 
                grant_type: 'authorization_code',
                redirect_uri: {redirectUri}, 
                code: {code}
            })
        };
        fetch('https://api.instagram.com/oauth/access_token', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    useEffect (() => {
        setCode(searchParams.get('code'));
        if (code) {
            getToken();
        }
    }, [searchParams, code, setCode, getToken]);


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