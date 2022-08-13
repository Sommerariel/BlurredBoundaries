import { 
    useState, 
    useEffect, 
  } from 'react';
import { useSearchParams, useLoaderData } from "@remix-run/react";
import { json }from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Sidebar from "~/components/sidebar";

import InstagramIcon from '@mui/icons-material/Instagram';

const redirectUri = 'https://the-awesome-sommerariel-site.netlify.app/instagram';

export const loader: LoaderFunction = async({ params }) => {
    console.log({ params });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': redirectUri },
        body: JSON.stringify({ 
            client_id: process.env.INSTAGRAM_APP_ID,
            client_secret: process.env.INSTAGRAM_SECRET, 
            grant_type: 'authorization_code',
            redirect_uri: {redirectUri}, 
            // code: {code}
        })
    };
    const res = await fetch('https://api.instagram.com/oauth/access_token', requestOptions);
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log('Success:', result);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
    return json(await res.json());
}

export default function instagramRoute(): JSX.Element  {

    const [isReady, setIsReady] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const [appId, setAppId] = useState();
    const [searchParams] = useSearchParams();

    const data = useLoaderData();

    console.log({data})

    console.log("instacode", searchParams.get('code'))

    useEffect (() => {
        setCode(searchParams.get('code'));
        setAppId((window as any).ENV.INSTAGRAM_APP_ID);
        // const appS = (window as any).ENV.INSTAGRAM_SECRET;
    }, [searchParams, setCode,]);


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