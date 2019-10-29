import * as React from 'react';

const cachedScripts: string[] = [];
const useScript = (src: string) => {
    const [state, setState] = React.useState({
        loaded: false,
        error: false
    });

    React.useEffect(() => {
        if (cachedScripts.includes(src)) {
            setState({
                loaded: true,
                error: false
            });
        } else {
            cachedScripts.push(src);

            const script = document.createElement('script');
            script.src = src;
            script.async = true;

            const onScriptLoad = () => {
                setState({
                    loaded: true,
                    error: false
                });
            };

            const onScriptError = () => {
                const index = cachedScripts.indexOf(src);
                if (index >= 0) cachedScripts.splice(index, 1);
                script.remove();

                setState({
                    loaded: true,
                    error: true
                });
            };

            script.addEventListener('load', onScriptLoad);
            script.addEventListener('error', onScriptError);

            document.body.appendChild(script);

            return () => {
                script.removeEventListener('load', onScriptLoad);
                script.removeEventListener('error', onScriptError);
            };
        }
    }, [src]);

    return [state.loaded, state.error];
}

export default useScript;
