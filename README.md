GitHub Copilot: Sure, here's an example of how to use the `DiscordFivemApi` class:

## Installation

You can install the `discord-fivem-api` package using npm:

```
$ npm install discord-fivem-api
OR 
$ yarn add discord-fivem-api
```

## Usage

To use the `DiscordFivemApi` class, you first need to import it:

```javascript
const DiscordFivemApi = require('discord-fivem-api');
```

Then, you can create a new instance of the class with the desired options:

```javascript
const options = {
  address: 'localhost',
  port: 30120,
  useStructure: true,
  interval: 5000,
};

const api = new DiscordFivemApi(options, true);
```

The `options` object can contain the following properties:

- `address`: The IP address or hostname of the FiveM server (required).
- `port`: The port number of the FiveM server (default: `30120`).
- `useStructure`: Whether to use the `Player` and `Server` classes from the `structures` directory (default: `true`).
- `interval`: The interval in milliseconds between updates (default: `2500`).

The second argument to the constructor (`init`) specifies whether to initialize the API immediately (default: `false`).

Once you have created an instance of the `DiscordFivemApi` class, you can use its methods to retrieve information about the FiveM server:

```javascript
api.getStatus()
  .then((status) => console.log(`Server status: ${status}`))
  .catch((err) => console.error(err));

api.getServerData()
  .then((serverData) => console.log(serverData))
  .catch((err) => console.error(err));

api.getServerPlayers()
  .then((players) => console.log(players))
  .catch((err) => console.error(err));

api.getPlayersOnline()
  .then((count) => console.log(`Players online: ${count}`))
  .catch((err) => console.error(err));

api.getMaxPlayers()
  .then((maxPlayers) => console.log(`Max players: ${maxPlayers}`))
  .catch((err) => console.error(err));
```

The `getStatus()` method returns a promise that resolves to either `'online'` or `'offline'`.

The `getServerData()` method returns a promise that resolves to an object containing information about the FiveM server. If `useStructure` is `true`, the object will be an instance of the `Server` class.

The `getServerPlayers()` method returns a promise that resolves to an array of objects containing information about the players on the FiveM server. If `useStructure` is `true`, the objects will be instances of the `Player` class.

The `getPlayersOnline()` method returns a promise that resolves to the number of players currently online.

The `getMaxPlayers()` method returns a promise that resolves to the maximum number of players allowed on the FiveM server.

You can also listen for events emitted by the `DiscordFivemApi` instance:

```javascript
api.on('ready', () => console.log('API initialized'));
api.on('readyPlayers', (players) => console.log(`Players: ${players.length}`));
api.on('readyResources', (resources) => console.log(`Resources: ${resources.length}`));
api.on('playerJoin', (player) => console.log(`${player.name} joined the server`));
api.on('playerLeave', (player) => console.log(`${player.name} left the server`));
api.on('resourceAdd', (resource) => console.log(`Resource added: ${resource}`));
api.on('resourceRemove', (resource) => console.log(`Resource removed: ${resource}`));
```

The `ready` event is emitted when the API is initialized.

The `readyPlayers` event is emitted when the player data is ready.

The `readyResources` event is emitted when the resource data is ready.

The `playerJoin` event is emitted when a player joins the server.

The `playerLeave` event is emitted when a player leaves the server.

The `resourceAdd` event is emitted when a resource is added to the server.

The `resourceRemove` event is emitted when a resource is removed from the server.

## License

This package is licensed under the MIT License.