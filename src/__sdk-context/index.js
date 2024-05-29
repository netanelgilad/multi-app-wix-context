let currentAccessToken = null;
import {createClient} from '@wix/sdk';

export function setAccessToken(token) {
    currentAccessToken = token;
}

export const wixContext = {
    initWixModules(modules) {
        const client = createClient({
            headers: {
                Authorization: currentAccessToken
            }
        });

        return client.use(modules);
    }
}