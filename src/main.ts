import { OAuthStrategy, createClient } from "@wix/sdk";
import { app1SomethingLikeACustomElement } from "../dist/app1";
import { app2SomethingLikeACustomElement } from "../dist/app2";

const app1Client = createClient({
  auth: OAuthStrategy({
    clientId: "79b9b141-d914-41ef-86ea-4f7a5f3072a3",
  }),
});

const app2Client = createClient({
  auth: OAuthStrategy({
    clientId: "2fb39349-3744-4242-920d-9ccd74af3229",
  }),
});

const app1Token = (await app1Client.auth.generateVisitorTokens()).accessToken
  .value;
const app2Token = (await app2Client.auth.generateVisitorTokens()).accessToken
  .value;

app1SomethingLikeACustomElement(() => app1Token);
app2SomethingLikeACustomElement(() => app2Token);
