class PlayerEntity implements Player {
    public readonly mp: PlayerMp
    public performing = false
    public dbId = 0

    constructor(player: PlayerMp) {
        this.mp = player
    }
   
}

export default PlayerEntity
