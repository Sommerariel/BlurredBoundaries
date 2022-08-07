import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
  } from 'react';
import Button from '@mui/material/Button';

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

// Context.
export const FbSdkScriptContext = createContext({});

// Create a custom hook to use the context.
export const useFbSdkScriptContext = () => useContext(FbSdkScriptContext)

export default function fbRoute({
    autoLogAppEvents = true,
    xfbml = true,
    version = 'v8.0',
  }) {
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
        }

        if (hasLoaded === true) {
            FB.init({
            appId: '797474598290630',
            autoLogAppEvents,
            xfbml,
            version 
            })
            setIsReady(true)
        }
        if (userID) {
            // https://developers.facebook.com/docs/graph-api/reference/user
            // fetch all the fields that we have available to use publically 
            FB.api('/me', {fields: 'birthday,email,gender,hometown,inspirational_people,favorite_athletes,favorite_teams,languages,link,quotes,significant_other,sports,picture.type(large)'}, function(response) {
                console.log(response);
            });
        }
    }, [hasLoaded, userID]);

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
            console.log({response});
        });
    }
    
    const getUserInfo = () => {
        FB.api('/me', function(response: any) 
        {
            if (response && !response.error) {
                console.log({response})
                setUserID(response.id);
                // setState userInfo and then we can populate it on the page
                
                setUserData({
                    name: response.name,
                    UID: response.id,
                    birthday: response.birthday,
                    email: response.email,
                    gender: response.gender,
                    hometown: response.hometown.name,
                    inspirationalPeople: response.inspirational_people,
                    favoriteAthletes: response.favorite_athletes,
                    favoriteTeams: response.favorite_teams,
                    languages: response.languages,
                    link: response.link,
                    profilePicture: {
                        height: response.picture.data.height,
                        width: response.picture.data.height,
                        url: response.picture.data.url,
                    },
                    significantOther: response.significant_other,
                    sports: response.sports
                })
            }
        });
    }
    



    return (
        <FbSdkScriptContext.Provider value={{ isReady, hasLoaded }}>
            {hasLoaded && isReady && (
                <>
                        <Button variant="outlined" onClick={OnLogOn}>Log into FB</Button>
                        <Button variant="outlined" onClick={OnLogOut}>Log out FB</Button>
                        {isLoggedIn && userData && (
                            <>
                                <p> Your personal public data: </p>
                                {userData.name}
                                {userData.UID}
                            </>
                        )}
                </>
            )}

        </FbSdkScriptContext.Provider>
    );
}