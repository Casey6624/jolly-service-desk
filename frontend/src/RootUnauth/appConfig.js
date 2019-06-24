
import * as Msal from "msal"

var msalConfig = {
    auth: {
        clientId: "30e12121-d58c-4de5-8167-c1839ba50c8a",
        authority: "https://login.microsoftonline.com/a9a8457e-f15f-4f98-bdc3-add5f9f45286"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

var myMSALObj = new Msal.UserAgentApplication(msalConfig);

export default myMSALObj