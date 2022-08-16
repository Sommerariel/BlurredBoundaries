import { 
    useState, 
    useEffect, 
  } from 'react';
import { useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node"; 
import type { LoaderFunction } from "@remix-run/node";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Sidebar from "~/components/sidebar";

import InstagramIcon from '@mui/icons-material/Instagram';

import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export type AccessToken = {
    accessToken: string;
};

const redirectUri = 'https://blurred-boundaries.netlify.app/instagram';

export const loader: LoaderFunction = async({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const form = new FormData();
    form.append('client_id', String(process.env.INSTAGRAM_APP_ID));
    form.append('client_secret', String(process.env.INSTAGRAM_SECRET));
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', String(redirectUri));
    form.append('code', String(code));
    
    const res = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        body: form
    });
    return res;
}

export default function instagramRoute(): JSX.Element  {

    const [appId, setAppId] = useState();
    const [instaData, setInstaData] = useState<any>();

    const data = useLoaderData();

    console.log({data})
    console.log("access token", data.access_token);
    console.log(" user id", data.user_id);
    const getUserInfo = async ({accessToken}: AccessToken) => {
        const fields='id,username,media_count,account_type';
        fetch(`https://graph.instagram.com/me?fields=${fields}&access_token=${accessToken}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("response data", data)
            setInstaData({...data});
        })
        // console.log({res})
    }

    useEffect (() => {
        setAppId((window as any).ENV.INSTAGRAM_APP_ID);
        if (data.access_token) {
            getUserInfo({accessToken: data.access_token});
        }
    }, [data.access_token, appId ]);


    const onSearch = () => {
        const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
        window.open(url, 'noopener,noreferrer');
    }

    console.log({instaData})
    return (
        <>
            <div className="overlay"></div>
            <div className="scanline"></div>
            <Box sx={{ display: 'flex', backgroundColor: '#363434' }}  className="wrapper">
                <Sidebar />
                <Box
                    component="main"  
                    sx={{ 
                        flexGrow: 1, 
                        p: 3, 
                        zIndex: '1200', 
                        position: 'inherit' 
                    }}  
                    className="content"
                >
                    <Button  
                        variant="contained" 
                        sx={{
                            backgroundColor: '#85ffe7', 
                            color: '#ff38a9', 
                            fontFamily: `'VT323', Courier`, 
                            margin: 2,
                            '& span': {
                                animation: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#ff38a9',
                                color: '#85ffe7'
                            }
                        }} 
                        startIcon={<InstagramIcon />} 
                        onClick={onSearch}>
                            Get your Public Info
                        </Button>
                </Box>
            </Box>
        </>
    )
};