import { 
    useState, 
    useEffect, 
  } from 'react';
import { useLoaderData } from "@remix-run/react";
import { json }from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Sidebar from "~/components/sidebar";

import InstagramIcon from '@mui/icons-material/Instagram';

const redirectUri = 'https://the-awesome-sommerariel-site.netlify.app/instagram';

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

    const [isReady, setIsReady] = useState(false);
    const [appId, setAppId] = useState();

    const data = useLoaderData();

    console.log({data})
    console.log("access token", data.access_token);
    console.log(" user id", data.user_id);


    useEffect (() => {
        setAppId((window as any).ENV.INSTAGRAM_APP_ID);
        // const appS = (window as any).ENV.INSTAGRAM_SECRET;
    }, []);


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