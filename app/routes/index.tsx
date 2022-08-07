import type { LinksFunction } from "@remix-run/node"; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from "~/components/sidebar";


// import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [
    // { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}
  ];
};


export default function Index() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Typography variant="h1">Blurred Boundaries: Your Public Information Guide</Typography>       
        <Typography paragraph></Typography>
      </Box>
    </Box>
  );
}
