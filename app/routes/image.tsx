import { 
    useState, 
    useEffect,
    useMemo, 
  } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from "~/components/sidebar";
import ExifReader from 'exifreader';
import type { LinksFunction } from "@remix-run/node"; 

import PhotoIcon from '@mui/icons-material/Photo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export type ValueDescription = {
    value?: number | string;
    description?: string;
};

export type ExifData = ExifReader.ExpandedTags;

export default function imageRoute(): JSX.Element  {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [exifData, setExifData] = useState<ExifData>();
    const [displayData, setDisplayData] = useState<any>([]);

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
        } else {
            setHasLoaded(true);
        }

        if (hasLoaded === true) {
            setIsReady(true);
        }

        if (selectedImage) {
            loadImage(selectedImage);
            console.log('how many times does this run?')
        };

        if (exifData) {
            toArray(exifData);
        }

    }, [hasLoaded, selectedImage, exifData?.file?.["Image Height"]?.value]);

    const onUpload = (event: any ) => {
        setSelectedImage(event.target.files[0]);
    };

    const loadImage = async(selectedImage: any) => {
        const tags = await ExifReader.load(selectedImage, {expanded: true});  
        setExifData({...tags});
    };
   
    console.log({exifData})

    // const toArray = (obj: any) => {
    //     const result = [];
    //     for (const prop in obj) {
    //         const value = obj[prop];
    //         if (typeof value === 'object') {
    //             result.push(toArray(value)); // <- recursive call
    //         }
    //         else {
    //             result.push(`${prop}: ${value}`);
    //         }
    //     }
    //     setDisplayData({
    //         ...result,
    //         ...exifData,
    //     });
    //     console.log({result})
    // }

    // this doesn't do nested :(
    const result: any[] = [];
    const toArray = (obj: any) => {
        for (const [key, value] of Object.entries(obj)) {
            // console.log(`${key}: ${value}`)
            // console.log({key})
            // console.log({value})
            // console.log("typeof", typeof value)

            if (value !== 'object') {
                // console.log("woof")
                console.log(`${key}: ${value}`);
                result.push(`${key}: ${value}`);
                console.log({result})
            } 
            if (typeof value === 'object') {
                // console.log("MEow")
                // console.log({value})
                toArray(value);
            }

        }

        setDisplayData(result);
        return result;
    }



    return (
        <>
            <div className="overlay"></div>
            <div className="scanline"></div>        
            <Box sx={{ display: 'flex', backgroundColor: '#363434' }}  className="wrapper">
                <Sidebar />
                {hasLoaded && isReady && (
                    <Box
                        component="main"  
                        sx={{ 
                            display: 'flex',
                            flexGrow: 1, 
                            p: 3, 
                            zIndex: '1200', 
                            position: 'inherit' 
                        }}  
                        className="content"
                    >
                        <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column'}}>
                        <Button 
                            variant="contained"
                            sx={{
                                backgroundColor: '#85ffe7', 
                                color: '#ff38a9', 
                                fontFamily: `'VT323', Courier`, 
                                width:'50%',
                                margin: 2,
                                '& span': {
                                    animation: 'none',
                                },
                                '&:hover': {
                                    backgroundColor: '#ff38a9',
                                    color: '#85ffe7'
                                }
                            }}
                            component="label" 
                            startIcon={<PhotoIcon />}
                        >
                            Check Photo Data
                            <input hidden accept="image/*" multiple type="file" onChange={onUpload}/>
                        </Button>
                        {selectedImage && (
                            <Box sx={{margin: '16px', display: 'flex', flexDirection: 'column'}}>
                                <img alt="uploaded image" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                <br />
                                <Button 
                                    variant="outlined" 
                                    sx={{
                                        color: '#85ffe7', 
                                        border: '1px solid #85ffe7',
                                        fontFamily: `'VT323', Courier`, 
                                        width: '50%',
                                        margin: '16px 0',
                                        '& span': {
                                            animation: 'none',
                                        },
                                        '&:hover': {
                                            color: '#ff38a9', 
                                            border: '1px solid #ff38a9',
                                        }
                                    }}
                                    startIcon={<DeleteForeverIcon />}
                                    onClick={()=>setSelectedImage(null)}
                                >
                                    Remove
                                </Button>
                                <pre id="allMetaDataSpan"></pre>
                            </Box>
                        )}
                        </Box>

                        <Box sx={{ width: '50%'}}>
                            {exifData && (
                                <>
                                    <p>// Exif data</p>
                                    {displayData}
                                </>
                            )}
   
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    )
};