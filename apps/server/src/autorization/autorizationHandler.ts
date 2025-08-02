import { compare } from "$server/utils/encryption";

class AutorizationHandler {

    public async validateUser(userPassword: string, password: string) {
		return await compare(password, userPassword);
	}
}

export const autorizationHandler = new AutorizationHandler();
