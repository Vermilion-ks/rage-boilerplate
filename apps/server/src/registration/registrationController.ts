
import { prisma } from "../db";
import { executeNotification } from "../utils/notifications";

class RegistrationController {
       constructor() {
        mp.events.subscribe(
            {
                'Auth-SignUp': this.handleSignUp.bind(this),
            },
            false,
        )
       }

       private async handleSignUp(player: Player, data: {email: string; password: string;}) {
        const user = await prisma.user.findFirst({
			where: { email: data.email },
		});
        if (user) {
			executeNotification(player, "auth.emailUsed", "error");
			return false;
		}
       }
}

export const registrationController = new RegistrationController();