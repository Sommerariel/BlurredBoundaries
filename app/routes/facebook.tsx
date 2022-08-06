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


// export async function loader() {
//     return json(await fakeGetTodos());
// }
  
export const action: ActionFunction = async ({
    request,
  }) => {
    const form = await (await request.formData()).get("username");
    FB.api('/me', {fields: 'last_name'}, function(response) {
        console.log(response);
      });
    try {
        return json({ ok: true });
    } catch (error: any) {
        return json({ error: error.message });
    }
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
    

    return (
        <FbSdkScriptContext.Provider value={{ isReady, hasLoaded }}>
            {hasLoaded && isReady && (
                <>
                    <fetcher.Form method="post" action="/facebook">
                        <TextField id="fb-username" label="Username" variant="outlined"/> 
                        <Button variant="outlined" type="submit" disabled={fetcher.state === "submitting"}>Submit</Button>
                        {fetcher.type === "done" ? (
                            fetcher.data.ok ? (
                                <p> Your personal data: </p>
                            ) : null
                        ) : null }
                    </fetcher.Form>
                </>
            )}

        </FbSdkScriptContext.Provider>
    );
}