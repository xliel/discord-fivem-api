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

# Example :
### Fivem Stats

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const fivem = require("discord-fivem-api");
 
client.on("ready", () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
 if (message.author.bot) return;
 if (message.content === 'stats') {
    fivem.getServerInfo("000.00.00.00:30120").then(server => {
      let result  = [];
      let index = 1;
      for (let player of server.players) {
        result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
      }
      const Embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor("Server is online")
        .setTitle(`Players (${server.players.length}/${server.infos.vars.sv_maxClients})`)
        .setDescription(result)
        .setTimestamp();
      message.channel.send(Embed);
    }).catch(err => {
      console.log(err);
      const Embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setAuthor("Server is offline")
      .setTimestamp();
    message.channel.send(Embed);
    });
 }
});

client.login("Your_Bot_Token_here");
```

### Preview
![FivemStats](https://cdn.discordapp.com/attachments/621111828025573396/771737140227866635/unknown.png)
