import { useState, useEffect } from 'react';
import type { LinksFunction } from "@remix-run/node"; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Sidebar from "~/components/sidebar";

import FacebookIcon from '@mui/icons-material/Facebook';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import styles from "../styles/index.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
  ];
};

export type ProfilePicture = {
    height: string;
    width: string;
    url: string;
};

export type GeneralKeyPair = {
    [key:string]: string;
}

export type User = {
    name?: string;
    id?: string;
}

// types returned from https://developers.facebook.com/docs/graph-api/reference/user with additional typings for easier reading
export type FBUser = {
    name?: string;
    UID?: string;
    birthday?: string;
    email?: string;
    gender?: string;
    hometown?: string;
    inspirationalPeople?: GeneralKeyPair[];
    favoriteAthletes?: GeneralKeyPair[];
    favoriteTeams?: GeneralKeyPair[];
    languages?: GeneralKeyPair[];
    link?: string;
    profilePicture?: ProfilePicture;
    significantOther?: User;
    sports?: GeneralKeyPair[];
};


export default function fbRoute({
    autoLogAppEvents = true,
    xfbml = true,
    version = 'v8.0',
  }): JSX.Element {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [userID, setUserID] = useState(undefined);
    const [userData, setUserData] = useState<FBUser>({});
    const [isLoggedIn, setLogInState] = useState(false);

    /**
   * Extra security measure to check if the script has
   * already been included in the DOM
   */
    const scriptAlreadyExists = () => document.querySelector('script#fb-sdk') !== null;

    /**
     * Append the script to the document.
     * Whenever the script has been loaded it will
     * set the isLoaded state to true.
     */
    const appendSdkScript = () => {
        const script = document.createElement('script')
        script.id = 'fb-sdk'
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.async = true
        script.defer = true
        script.crossOrigin = 'anonymous'
        script.onload = () => setHasLoaded(true)
        document.body.append(script)
    };

    useEffect(() => {

        if (!scriptAlreadyExists()) {
            appendSdkScript()
        } else {
            setHasLoaded(true);
        }

        if (hasLoaded === true) {
            FB.init({
            appId: (window as any).ENV.FACEBOOK_APP_ID,
            autoLogAppEvents,
            xfbml,
            version 
            })
            setIsReady(true)
        }
        getAdditional();

    }, [hasLoaded, userID, userData?.UID]);

    const OnLogOn = () => {

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                // check to see if we are already logged in
                setLogInState(true);
            }
        });

        FB.login(function(response) {
            // handle the response
            if (response.status === 'connected') {
                // Logged into Facebook.
                setLogInState(true);
                getUserInfo();
              } else {
                // user did not allow log in
              }
          }, {scope: 'public_profile,email'});
    }
    
    const OnLogOut = () => {
        FB.logout(function(response) {
            // Person is now logged out
            setLogInState(true);
         });
         FB.getLoginStatus(function(response) {
            console.log("fb log in status")
            // console.log({response});
        });
    }
    
    const getUserInfo = () => {
        FB.api('/me', function(response: any) 
        {
            if (response && !response.error) {
                // console.log({response})
                setUserID(response.id);

                // setState userInfo and then we can populate it on the page
                setUserData({
                    name: response.name,
                    UID: response.id,
                })
            }
        });
    }

    const getAdditional = () => {
        console.log('do we get here?')
        console.log(userID)
        if (userID) {
            console.log("did we make it here?")
            // https://developers.facebook.com/docs/graph-api/reference/user
            // fetch all the fields that we have available to use publically 
            FB.api('/me', {fields: 'birthday,email,gender,hometown,inspirational_people,favorite_athletes,favorite_teams,languages,link,quotes,significant_other,sports,picture.type(large)'}, function(response: any) {
                if (response && !response.error) {
                    setUserData({
                        ...{
                            birthday: response.birthday,
                            email: response.email,
                            gender: response.gender,
                            hometown: response.hometown?.name,
                            inspirationalPeople: response.inspirational_people,
                            favoriteAthletes: response.favorite_athletes,
                            favoriteTeams: response.favorite_teams,
                            languages: response.languages,
                            link: response.link,
                            profilePicture: {
                                height: response.picture?.data?.height,
                                width: response.picture?.data?.height,
                                url: response.picture?.data?.url,
                            },
                            significantOther: response.significant_other,
                            sports: response.sports
                        }
                        
                    });
                }
                console.log({response});
            });
        }
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
                            flexGrow: 1, 
                            p: 3, 
                            zIndex: '1200', 
                            position: 'inherit' 
                        }}  
                        className="content"
                    >
                            <Button
                                variant="contained" 
                                sx={{
                                    backgroundColor: '#85ffe7', 
                                    color: '#ff38a9', 
                                    fontFamily: `'VT323', Courier`, 
                                    margin: 2,
                                    '& span': {
                                        animation: 'none',
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ff38a9',
                                        color: '#85ffe7'
                                    }
                                }}
                                startIcon={<PersonSearchIcon />} 
                                onClick={OnLogOn}
                            >
                                Get your Public Info
                            </Button>
                            <Button 
                                variant="outlined" 
                                sx={{
                                    color: '#85ffe7', 
                                    border: '1px solid #85ffe7',
                                    fontFamily: `'VT323', Courier`, 
                                    margin: 2,
                                    '& span': {
                                        animation: 'none',
                                    },
                                    '&:hover': {
                                        color: '#ff38a9', 
                                        border: '1px solid #ff38a9',
                                    }
                                }}
                                startIcon={<FacebookIcon />} 
                                onClick={OnLogOut}
                            >
                                    Log out out of Facebook
                            </Button>
                            {isLoggedIn && userData && (
                                <Box>
                                    {/*TODO create public information card that looks nice*/}
                                    <p> Your personal public data: </p>
                                    <p>birthday: {userData.birthday}</p>
                                    <p>email: {userData.email}</p>
                                    <p>gender: {userData.gender}</p>
                                    <p>hometown: {userData.hometown}</p>
                                    <p>inspirationalPeople: {userData.inspirationalPeople?.forEach((person) => person)}</p>
                                    <p>favoriteAthletes: {userData.favoriteAthletes?.forEach((person) => person)}</p>
                                    <p>favoriteTeams: {userData.favoriteTeams?.forEach((team) => team)}</p>
                                    <p>languages: {userData.languages?.forEach((language) => language)}</p>
                                    <p>link: <a>{userData.link}</a></p>
                                    <p>significantOther: {userData.significantOther}</p>
                                    <p>sports: {userData.sports?.forEach((sport) => sport)}</p>

                                    {/* profilePicture: {
                                        height: response.picture?.data?.height,
                                        width: response.picture?.data?.height,
                                        url: response.picture?.data?.url,
                                    } */}
                                </Box>
                            )}
                    </Box>
                )}
            </Box>
        </>

    );
}