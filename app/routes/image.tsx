import { 
    useState, 
    useEffect, 
  } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PhotoIcon from '@mui/icons-material/Photo';


export default function imagemRoute(): JSX.Element  {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const fs = require('fs');
    const piexif = require('piexifjs'); 

    const scriptAlreadyExists = () => document.querySelector('script#exif-js') !== null;

    const appendSdkScript = () => {
        const script = document.createElement('script')
        script.id = 'exif-js'
        script.src = 'https://cdn.jsdelivr.net/npm/exif-js'
        script.async = true
        script.defer = true
        script.crossOrigin = 'anonymous'
        script.onload = () =>  setHasLoaded(true);
        document.body.append(script)
    };

    useEffect (() => {
        if (!scriptAlreadyExists()) {
            appendSdkScript();
        }

        if (hasLoaded === true) {
            setIsReady(true);
        }

    }, [hasLoaded])

    const onClick = () => {

    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {hasLoaded && isReady && (
                    <>
                        <Button variant="contained" startIcon={<PhotoIcon />} onClick={onClick}>Check Photo Data</Button>

                    </>

                )}
            </Box>

            Image reading
        </>
    )
};