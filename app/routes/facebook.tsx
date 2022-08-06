import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect 
  } from 'react';

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
            hello
            {isReady}
            {hasLoaded}

        </FbSdkScriptContext.Provider>
    );
}