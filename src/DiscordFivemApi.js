const { EventEmitter } = require('events');
const fetch = require('node-fetch');
const { Player, Server: ServerData } = require('./structures/index');
const { Error: DfaError, TypeError: DfaTypeError } = require('./util/Error');

class DiscordFivemApi extends EventEmitter {
  options;
  constructor(options, init = false, useStructure = true) {
    super();

    if (!this.options) this.options = {};
    if (!this.options?.port) this.options.port = 30120;
    this.options = options;

    if (!this?.options?.address) {
      throw new DfaError('NO_ADDRESS', 'No address was provided.');
    }
    if (!this?.options?.port) {
      throw new DfaError('NO_PORT', 'No port was provided.');
    }

    if (typeof init !== 'boolean') {
      throw new DfaTypeError(
        'INVALID_INIT',
        'The init option must be a boolean.'
      );
    }
    if (typeof useStructure !== 'boolean' && useStructure !== undefined) {
      throw new DfaTypeError(
        'INVALID_USE_STRUCTURE',
        'The useStructure option must be a boolean.'
      );
    }

    this._players = [];
    this.useStructure = options?.useStructure;

    this.address = options.address;
    this.port = options.port || 30120;

    if (init) this._init();
  }

  get players() {
    return this._players;
  }

  set players(players) {
    this._players = players;
  }

  set addPlayer(player) {
    this.players.push(player);
  }

  set removePlayer(player) {
    this.players.splice(this.players.indexOf(player), 1);
  }

  getStatus() {
    return new Promise((resolve, reject) => {
      fetch(`http://${this.address}:${this.port}/info.json`, {
        timeout: 5000,
      })
        .then((res) => res.json())
        .then(() => {
          resolve('online');
        })
        .catch(() => {
          resolve('offline');
        });
    });
  }

  getServerData() {
    return new Promise((resolve, reject) => {
      fetch(`http://${this.address}:${this.port}/info.json`, {
        timeout: 5000,
      })
        .then((res) => res.json())
        .then((data) => {
          if (this.useStructure) {
            resolve(new ServerData(data));
          } else resolve(data);
        })
        .catch((err) => {
          reject({
            error: {
              message: err.message,
              stack: err.stack,
            },
            data: {},
          });
        });
    });
  }

  getServerPlayers() {
    return new Promise((resolve, reject) => {
      fetch(`http://${this.address}:${this.port}/players.json`, {
        timeout: 5000,
      })
        .then((res) => res.json())
        .then((json) => {
          if (this.useStructure) {
            const players = [];
            for (const player of json) {
              players.push(new Player(player));
            }
            this.players = players;

            resolve(players);
          } else resolve(json);
        })
        .catch((err) => {
          reject({
            error: {
              message: err.message,
              stack: err.stack,
            },
            players: [],
          });
        });
    });
  }

  getPlayersOnline() {
    return new Promise((resolve, reject) => {
      fetch(`http://${this.address}:${this.port}/players.json`, {
        timeout: 5000,
      })
        .then((res) => res.json())
        .then((json) => {
          resolve(json.length);
        })
        .catch((err) => {
          reject({
            error: {
              message: err.message,
              stack: err.stack,
            },
            playersOnline: 0,
          });
        });
    });
  }

  getMaxPlayers() {
    return new Promise((resolve, reject) => {
      fetch(
        `http://${
          this.options.ip && this.options.port
            ? `${this.options.ip}:${this.options.port}`
            : `${this.options.ip}`
        }/info.json`,
        {
          timeout: 5000,
        }
      )
        .then((res) => res.json())
        .then((json) => {
          resolve(json.vars.sv_maxClients);
        })
        .catch((err) => {
          reject({
            error: {
              message: err.message,
              stack: err.stack,
            },
            maxPlayers: 0,
          });
        });
    });
  }

  async _init() {
    this.emit('ready');

    const [serverData, players] = await Promise.all([
      this.getServerData().catch(() => {}),
      this.getServerPlayers().catch(() => []),
    ]);

    this.players = players;
    this.resources = serverData?.resources ?? [];

    this.emit('readyPlayers', players);
    this.emit('readyResources', this.resources);

    setInterval(async () => {
      const newPlayers = await this.getServerPlayers().catch(() => []);
      if (this.players.length != newPlayers.length) {
        if (this.players.length < newPlayers.length) {
          for (const player of newPlayers) {
            if (this.players.find((p) => p?.id == player?.id)) continue;
            this.emit('playerJoin', player);
          }
        } else {
          for (const player of this.players) {
            if (newPlayers.find((p) => p?.id == player?.id)) continue;
            this.emit('playerLeave', player);
          }
        }

        this.players = newPlayers;
      }

      const serverData2 = await this.getServerData().catch(() => {});
      const newResources = serverData2?.resources ?? [];
      if (this.resources?.length != newResources?.length) {
        if (this.resources?.length < newResources?.length) {
          for (const resource of newResources) {
            if (this.resources.find((r) => r == resource)) continue;
            this.emit('resourceAdd', resource);
          }
        } else {
          for (const resource of this.resources) {
            if (newResources.find((r) => r == resource)) continue;
            this.emit('resourceRemove', resource);
          }
        }
      }
    }, this.options?.interval || 2500);
  }
}

module.exports = DiscordFivemApi;
