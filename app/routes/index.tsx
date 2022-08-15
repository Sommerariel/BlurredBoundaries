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


export default function Index() {
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
          <Typography variant="h1" sx={{ fontSize: '2.5rem', fontFamily: `'VT323', Courier` }}>Blurred Boundaries: Your Public Information Guide</Typography>       
          <Box sx={{p: 3, backgroundColor: '#00000045', color: 'white', zIndex: '1200', position: 'inherit'}}>
            <Typography paragraph sx={{fontFamily: `'VT323', Courier`, }}>This project brings together differing technologies in order to allow users to explore their 
            public data. Users do not need to have any technical knowledge about the social media networks or how they gather 
            or serve up information to outside users. Users also don't need to have any deep technical knowledge on how images 
            store metadata such as GPS location. This project allows users to explore and educate themselves on exactly what 
            they are sharing so that they can be more conscious in the future.</Typography>
            <Typography sx={{fontFamily: `'VT323', Courier`, }}>Select an option to the left to explore what public data your social media profile has. You can also select
              Image info to learn about what information is stored in the images you are sharing. </Typography>
          </Box>
        </Box>
      </Box>
    </>

  );
}
