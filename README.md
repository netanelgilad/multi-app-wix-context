# Multi App Wix Context

An example of how multiple apps can run in the same JS realm but use different Wix contexts, each with its own authentication.

## Running the example

1. Clone the repo
2. Run `npm install`
3. Run `npm run build-apps`
4. Run `npm run dev`
5. Open the browser at the vite printed url
6. Open the console so you'll be able to see the logs
7. Click the app 1 button, see it prints some set of products taken for a Wix Site
8. Click the app 2 button, see it prints some set of products taken for a different Wix Site

This simulates two different apps running in the same JS realm, but accessing data with a different access token 
( for the simplicity of this example it used 2 client ids of different sites, but it could have been 2 different app instances on the same site).

## How it works

In this example, we introduce a new package `@wix/sdk-context` that stores the state for the Wix Context and provides the Wix Context for apps. This package has 2 exports:
* `setAccessToken` - a function that sets the access token in the module scope so it's availabe to this module only.
* `wixContext` - The Wix Context that provides the needed `initWixModules` to initialize contextual modules, and it used the access token set by `setAccessToken`.

This package is then used by both the host and the apps, in different ways:

* The host (the code that lodas and runs the apps - `main.ts`) creates the relevant tokens for each application and then loads and runs the apps, injecting an access token getter function that returns the correct access token for each app.
* The apps (`app-1/app1.ts` and `app-2/app2.ts`) then use this injected function to get an access token, and then use `setAccessToken` to set in the sdk-context module scope.
* After the initial setup, the apps start using contextual modules (`@wix/stores/context`) and print the result of querying products.
  
** What Makes this work? **

The key to this example is that each app is bundled in isolation from each other, each with it's own module tree, so each one gets it's own copy of `@wix/sdk-context`. This allos the apps have to have their own access token, and not interfere with each other.

To simulate the bundling of apps in isolation we use `tsup` to bundle the code of each app, and then the host loads the resulting bundles instead of the app code directly.
    