import type { LinksFunction } from "@remix-run/node"; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from "~/components/sidebar";


import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export default function privacyRoute(): JSX.Element  {
    return (
        <>
        <div className="overlay"></div>
        <div className="scanline"></div>
        <Box sx={{ display: 'flex', backgroundColor: '#363434' }} className="wrapper">
            <Sidebar />
            <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
            className="content"
            >
                <Typography variant="h1" sx={{ fontSize: '2.5rem', fontFamily: `'VT323', Courier` }}>Privacy Policy</Typography>       
                <Box sx={{p: 3, backgroundColor: '#00000045', color: 'white', zIndex: '1200', position: 'inherit'}}>
                    <Typography paragraph sx={{fontFamily: `'VT323', Courier`}}>This site uses third party APIs to request your public information
                    from social media APIs. This includes Facebook, and Instragram. This site also uses the third party nmp package exifreader to 
                    extract inforamtion from images. This site does not store any personal data outside of the browser. All data requested is ephemeral
                    and is not stored in any database.
                    </Typography>
                </Box>
            </Box>
        </Box>
        </>
    )
};