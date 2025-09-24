import { PegaEmbed } from '@labb/react-adapter';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { TokenInfo } from '@labb/constellation-core-types';
import { OAuth2Service } from '@labb/dx-engine';
import { config } from './config';

import './pega/ContainerMapping';

import './classless.css';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

async function render() {
    root.render(<Main />);
}

function Main() {
    const [loadingStatus, setLoadingStatus] = useState<boolean | undefined>(undefined);
    const [token, setToken] = useState<TokenInfo>();
    const [authError, setAuthError] = useState<string>();

    useEffect(() => {
        try {
            (async () => {
                setToken(await OAuth2Service.getTokenCredentials({
                    accessTokenUrl: config.accessTokenUrl,
                    clientId: config.clientId,
                    clientSecret: config.clientSecret,
                    appId: config.appId
                }) as TokenInfo);
            })();
        } catch (e) {
            setAuthError(e as string);
        }
    }, []);

    return <>
        {token && <PegaEmbed
            deployUrl='/'
            caseTypeID={config.caseTypeId}
            infinityServer={config.infinityServer}
            token={token}
            loadingDone={status => setLoadingStatus(status)}
        />}
        {(!token && !authError) && <h1>Authentication in progress</h1>}
        {(token && loadingStatus === undefined) && <h1>Process is being loaded</h1>}
        {(authError) && <h1>{authError}</h1>}
        {(loadingStatus === false) && <h1>Error communicating with Pega</h1>}
    </>
}

render();
