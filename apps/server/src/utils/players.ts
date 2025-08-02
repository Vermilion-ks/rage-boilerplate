import { isNumber } from 'lodash'
import PlayerEntity from '../player/playerEntity'

class Players {
    private items: Map<number, Player>
    private authorized: Map<number, Player>

    constructor() {
        this.items = new Map()
        this.authorized = new Map()

        this.init()
    }

    private init() {
        mp.events.add({
            playerJoin: this.add.bind(this),
        })
        mp.players.get = this.get.bind(this)
        mp.players.getByUUID = this.getByUUID.bind(this)
        mp.players.delete = this.delete.bind(this)
    }

    get(player: PlayerMp | number) {
        const target = isNumber(player) ? mp.players.at(player) : player

        return mp.players.exists(target) ? this.items.get(target.id) : null
    }

    getByUUID(id: number) {
        return id && this.authorized.get(id)
    }

    delete(id: number) {
        const player = this.items.get(id)

        if (player) {
            this.items.delete(id)
            this.authorized.delete(player.uuid)
        }
    }

    authorize(player: Player) {
        if (!player.uuid) return
        this.authorized.set(player.uuid, player)
    }

    private add(player: PlayerMp) {
        this.items.set(player.id, new PlayerEntity(player))
    }

}

export default new Players()
