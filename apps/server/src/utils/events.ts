import rpc from 'rage-rpc'
import { isArray } from 'lodash'
import logger from './logger'
import { ClientError } from './errors'



const eventLogs = logger.create('events')

class Events {
    constructor() {
        mp.events.subscribe = this.subscribe.bind(this)
        mp.events.reject = this.reject
    }

    reject(reason: any) {
        return Promise.reject(new ClientError(reason))
    }

    subscribe(
        events: { [name: string]: (player: Player, ...args) => any }
    ) {
        Object.entries(events).forEach(([name, callback]) =>
            rpc.register(name, async (data: null | any[], info) => {
                const player = mp.players.get(info.player as PlayerMp)

                if (
                    !player ||
                    player.performing
                ) {
                    eventLogs.info(name)
                    return new Promise((res, rej) => {})
                }

                try {
                    player.performing = true

                    const result = isArray(data)
                        ? await callback(player, ...data)
                        : await callback(player, data)

                    player.performing = false

                    return result
                } catch (err) {
                    player.performing = false

                    if (err instanceof ClientError)
                        return { err: { msg: err.message } }
                    if (!(err instanceof SilentError) && !err.field) {
                        console.error(err, `rpc event error "${name}"`);
                    }
                    return { err }
                }
            }),
        )
    }

}

export default new Events()
