import { executeNotification } from "$server/utils/notifications";
import rpc from "rage-rpc";
import { autorizationHandler } from "./autorizationHandler";
import { prisma } from "$server/database/databaseHandler";

class AutorizationController {
    constructor() {
		mp.events.subscribe({
			"Auth-SignIn": this.handleSignIn.bind(this),
		});
	}

	private async handleSignIn(player: Player, email: string, password: string) {
        const user = await prisma.user.findUnique({
			where: { email },
		});
		if (!user) {
			executeNotification(player, "auth.accountNotFound", "error");
			return
		}

        const validateUser = await autorizationHandler.validateUser(user.password, password);
		if (!validateUser) {
			executeNotification(player, "auth.incorrectPassword", "error");
			return
		}
        rpc.callClient(player.mp, 'Auth-SuccessLogin')
        player.uuid = user.id;
        executeNotification(player, "auth.successLogin", "success");
	}
}

export const autorizationController = new AutorizationController();