import { prisma } from "$server/database/databaseHandler";
import { executeNotification } from "$server/utils/notifications";
import { registrationHandler } from "./registrationHandler";

class RegistrationController {
	constructor() {
		mp.events.subscribe({
			"Auth-SignUp": this.handleSignUp.bind(this),
		});
	}

	private async handleSignUp(player: Player, data: { email: string; password: string; }) {
		if (await this.isEmailUsed(data.email)) {
			executeNotification(player, "auth.emailUsed", "error");
			return false;
		}

		const registrationData = await registrationHandler.prepareRegistrationData(data.email, data.password);

		await prisma.user.create({
			data: {
				email: registrationData.email,
				password: registrationData.encryptedPassword,
				socialName: player.mp.socialClub,
			},
		});

		return true;
	}

	private async isEmailUsed(email: string): Promise<boolean> {
		const user = await prisma.user.findFirst({ where: { email } });
		return !!user;
	}
}

export const registrationController = new RegistrationController();
