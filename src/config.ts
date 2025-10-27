const server = 'http://localhost:3333/prweb';
export default {
    /**
     * needed for reference implementation and constellation
     */

    // pega instance
    infinityServer: server,

    // authorization scoping
    appId: '<appId>',

    // client registration information
    clientId: '<clientId>',
    clientSecret: undefined,
    pkce: true,
    authService: 'pega',
    accessTokenUrl: `${server}/PRRestService/oauth2/v1/token`,
    authUrl: `${server}/PRRestService/oauth2/v1/authorize`,
    revokeUrl: `${server}/PRRestService/oauth2/v1/revoke`,
    redirectUrl: 'http://localhost:5173/auth.html',

    // action information
    caseTypeId: '<CaseTypeId>',
    startingFields: {},
    caseId: undefined,
    assignmentId: undefined,
    pageId: 'pyHome',
    className: 'Data-Portal',
    casePage: 'pyEmbedAssignment', //"pyEmbedAssignment", "pyEmbedAssignmentWithStages", "pyDetails", "pySimplifiedAssignment"
    // debug information
    xray: false,

    /**
     * needed for constellation only
     */

    // constellation design system location
    staticContentUrl: 'https://release.constellation.pega.com/cs/hotfix-7.2.91-20250717115457/8.24.52-349/react/prod/',

    // authentication mechanism
    grantType: 'authCode', //authCode, customBearer, none, clientCreds, passwordCreds

    // which action to perform
    action: 'createCase', //openCase, createCase, getNextWork, openAssignment, openPage

    // what page to use for showing a case type
    assignmentHeader: true,
    themeID: undefined,
    // https://docs.pega.com/bundle/platform/page/platform/user-experience/design-tokens-constellation.html
    theme: {}
};