import { TokenInfo } from '@labb/constellation-core-types';
import { BootstrapService, OAuth2Service, PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './pega/ContainerMapping';
import { config } from './pega/embed-config';
import reactLogo from './react.svg';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

async function render() {
    root.render(<Main />);
}

function Main() {
    const [container, setContainer] = useState<PContainer | null>(null);
    const [showCaseList, setShowCaseList] = useState<boolean>(false);

    useEffect(() => {
        try {
            (async () => {
                let token: TokenInfo;
                const authConfig = config.authUrl ?
                    {
                        clientId: config.clientId,
                        pkce: config.pkce,
                        authService: config.authService,
                        accessTokenUrl: config.accessTokenUrl,
                        authorizationUrl: config.authUrl,
                        redirectUrl: config.redirectUrl,
                        appId: config.appId
                    } : {
                        accessTokenUrl: config.accessTokenUrl,
                        clientId: config.clientId,
                        clientSecret: config.clientSecret,
                        appId: config.appId
                    };
                token = config.authUrl ?
                    await OAuth2Service.getTokenAuthorizationCode(authConfig) :
                    await OAuth2Service.getTokenCredentials(authConfig);
                setContainer(await BootstrapService.init({
                    appID: config.appId,
                    infinityServer: config.infinityServer,
                    token: token!
                }));
                if (config.action === 'createCase') {
                    await window.PCore.getMashupApi().createCase(config.caseTypeId);
                    setShowCaseList(false);
                } else if (config.action === 'openCase') {
                    await window.PCore.getMashupApi().openCase(config.caseId);
                    setShowCaseList(false);
                } else {
                    setShowCaseList(true);
                }
            })();
        } catch (e) {
            console.error(e);
        }
    }, []);
    return <>
        <img height="50px" src={reactLogo} onClick={() => {
            setShowCaseList(true);
        }} />
        {container && <GeneratePContainer container={container} />}
        {container && showCaseList && <ul>
            {
                window.PCore.getEnvironmentInfo().environmentInfoObject
                    ?.pyCaseTypeList
                    ?.map((caseType: any) => <li key={caseType.pyWorkTypeImplementationClassName}>
                        <a onClick={async () => {
                            try {
                                await window.PCore.getMashupApi().createCase(caseType.pyWorkTypeImplementationClassName);
                                setShowCaseList(false);
                            } catch (e) {
                                console.error(e);
                            }
                        }}>
                            {caseType.pyWorkTypeName}
                        </a>
                    </li>)
            }
        </ul>}
    </>
}

render();
