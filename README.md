# Discord-Fivem-Api
Small package in order to interact with FiveM API

**How-to install :**

```
npm i discord-fivem-api
```
**NPM:** [npmjs.com/discord-fivem-api](https://www.npmjs.com/package/discord-fivem-api)

**How-to use :** 
Here is an example to display the number of players online on a server.

```js
const fivem = require("discord-fivem-api");
fivem.getServerInfo("000.000.00.00:30120").then((server) => console.log(server.players.length))
```


```js
fivem.getServerInfo(ipServer:port)
```
(default port is 30120)

It returns a Promise with this object as parameter:
```
{
    "players": [{
        "endpoint"; string,
        "id": int, // The server ID og the player
        "identifiers": array, // Identifiers of the player
        "name": string, // Username's player
        "ping": int, // Le ping
    }],
    "infos": {
        "enhancedHostSupport": boolean,
        "icon": string, // Icon of the server (Base64)
        "resources": array, // All started resources
        "server": string, // FXServer's version (string format)
        "vars": { // Some convars defined in server.cfg
            "sv_enhancedHostSupport": boolean,
            "sv_lan": boolean,
            "sv_licenseKeyToken": string,
            "sv_maxClients": int,
            "sv_scriptHookAllowed": boolean,
            "sv_hostname": string,
        },
        "version": int, // FXServer's version (numeric format)
    }
}

```
