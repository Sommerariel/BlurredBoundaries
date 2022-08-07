import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
  } from 'react';
import Button from '@mui/material/Button';
import { useFetcher } from "@remix-run/react";

// Context.
export const FbSdkScriptContext = createContext({});

// Create a custom hook to use the context.
export const useFbSdkScriptContext = () => useContext(FbSdkScriptContext)

export default function fbRoute({
    autoLogAppEvents = true,
    xfbml = true,
    version = 'v8.0',
  }) {
    const fetcher = useFetcher();

    const [hasLoaded, setHasLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [userID, setUserID] = useState(undefined);
    const [userData, setUserData] = useState({});

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
            console.log('made it here')
            // https://developers.facebook.com/docs/graph-api/reference/user
            FB.api('/me', {fields: 'birthday,email,gender,hometown,inspirational_people,favorite_athletes,favorite_teams,languages,link,meeting_for,quotes,relationship_status,significant_other,sports,picture.type(large)'}, function(response) {
                console.log(response);
            });
        }
    }, [hasLoaded, userID]);

    const OnLogOn = () => {
        console.log("clicked");
        FB.getLoginStatus(function(response) {
            console.log("fb log in status")
            console.log({response});
        });
        FB.login(function(response) {
            // handle the response
            if (response.status === 'connected') {
                // Logged Facebook.
                console.log("logged in ")
                getUserInfo();
              } else {
                // user did not allow log in
                console.log("not logged in")
              }
              console.log({response})
          }, {scope: 'public_profile,email'});
    }
    
    const OnLogOut = () => {
        FB.logout(function(response) {
            // Person is now logged out
            console.log("logged out!!!")
            console.log({response})
         });
         FB.getLoginStatus(function(response) {
            console.log("fb log in status")
            console.log({response});
        });
    }
    
    const getUserInfo = () => {
        FB.api('/me', function(response: any) 
        {
            // if (response && !response.error) {
                console.log({response})
                console.log(`Welcome ${response.name}: Your UID is ${response.id}`); 
                setUserID(response.id);
                // setState userInfo and then we can populate it on the page
                setUserData({
                    name: response.name,
                    UID: response.id,
                })
            // }
        });
    }
    



    return (
        <FbSdkScriptContext.Provider value={{ isReady, hasLoaded }}>
            {hasLoaded && isReady && (
                <>
                        <Button variant="outlined" onClick={OnLogOn}>Log into FB</Button>
                        <Button variant="outlined" onClick={OnLogOut}>Log out FB</Button>
                        {userData && (
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