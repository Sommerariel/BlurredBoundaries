import { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
  } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
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

    /**
   * Extra security measure to check if the script has
   * already been included in the DOM
   */
    const scriptAlreadyExists = () => 
        document.querySelector('script#fb-sdk') !== null;

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

    /**
     * Runs first time when component is mounted
     * and adds the script to the document.
     */
    useEffect(() => {
        if (!scriptAlreadyExists()) {
            appendSdkScript()
        }
    }, []);

    /**
     * Whenever the script has loaded initialize the
     * FB SDK with the init method. This will then set
     * the isReady state to true and passes that
     * through the context to the consumers.
     */
    useEffect(() => {
    if (hasLoaded === true) {
        FB.init({
        appId: '797474598290630',
        autoLogAppEvents,
        xfbml,
        version 
        })
        setIsReady(true)
    }
    }, [hasLoaded]);
    console.log({isReady})
    console.log({hasLoaded})

    const OnClick = () => {
        console.log("clicked");
        FB.getLoginStatus(function(response) {
            console.log("fb log in status")
            console.log({response});
        });
        FB.login(function(response) {
            // handle the response
            if (response.status === 'connected') {
                // Logged into your webpage and Facebook.
                console.log("logged in ")
                console.log({response})
              } else {
                console.log("not logged in")
                console.log({response})

                // The person is not logged into your webpage or we are unable to tell. 
              }
          }, {scope: 'public_profile,email'});
    }

    const OnSubmit = (event: React.KeyboardEvent) => {
        console.log({event})
        if (event.key === 'Enter') {
            console.log('enter');
            OnClick();
        }
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
    

    return (
        <FbSdkScriptContext.Provider value={{ isReady, hasLoaded }}>
            {hasLoaded && isReady && (
                <>
                        <Button variant="outlined" onClick={OnClick}>Log into FB</Button>
                        <Button variant="outlined" onClick={OnLogOut}>Log out FB</Button>
                        {fetcher.type === "done" ? (
                            fetcher.data.ok ? (
                                <p> Your personal data: </p>
                            ) : null
                        ) : null }
                </>
            )}

        </FbSdkScriptContext.Provider>
    );
}