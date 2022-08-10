import { 
    useState, 
    useEffect, 
  } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from "~/components/sidebar";


import PhotoIcon from '@mui/icons-material/Photo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function imagemRoute(): JSX.Element  {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


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

    }, [hasLoaded]);

    const onUpload = (event: any ) => {
        console.log("uplaoded")
        setSelectedImage(event.target.files[0]);
        console.log({selectedImage})
    }



    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                {hasLoaded && isReady && (
                    <>
                        <Button variant="contained" component="label" startIcon={<PhotoIcon />}>
                            Check Photo Data
                            <input hidden accept="image/*" multiple type="file" onChange={onUpload}/>
                        </Button>
                        {selectedImage && (
                            <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <Button 
                                variant="outlined" 
                                startIcon={<DeleteForeverIcon />}
                                onClick={()=>setSelectedImage(null)}
                            >
                                Remove
                            </Button>
                            </div>
                        )}
                    </>
                )}
            </Box>

            Image reading
        </>
    )
};