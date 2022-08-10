import { 
    useState, 
    useEffect, 
  } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from "~/components/sidebar";
import ExifReader from 'exifreader';


import PhotoIcon from '@mui/icons-material/Photo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function imageRoute(): JSX.Element  {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
        setSelectedImage(event.target.files[0]);
        console.log("file",event.target.files[0])
    }
    console.log({selectedImage})
    let filename = '';
    let exifData = '';
    let tags;
    const  loadImage = async(selectedImage: any) => {
        tags = await ExifReader.load(selectedImage);  
        console.log({tags});    
        // TODO populate obj of tag data
    }
    if (selectedImage) {
        loadImage(selectedImage);
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
                            <pre id="allMetaDataSpan"></pre>
                            </div>
                        )}
                    </>
                )}
            </Box>
        </>
    )
};