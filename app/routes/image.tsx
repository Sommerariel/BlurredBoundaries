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

export type ValueDescription = {
    value?: number | string;
    description?: string;
};

export type ExifData = ExifReader.Tags & ExifReader.XmpTags & ExifReader.IccTags;

export default function imageRoute(): JSX.Element  {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [efixData, setExifData] = useState<ExifData>();

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

        if (selectedImage) {
            loadImage(selectedImage);
            console.log('how many times does this run?')
        };

    }, [hasLoaded, selectedImage]);

    const onUpload = (event: any ) => {
        setSelectedImage(event.target.files[0]);
    };

    const loadImage = async(selectedImage: any) => {
        const tags = await ExifReader.load(selectedImage);  
        setExifData({...tags});
    };
   


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