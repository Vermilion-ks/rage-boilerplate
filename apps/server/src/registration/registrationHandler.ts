import { encrypt } from '$server/utils/encryption';
import { trim} from 'lodash'

class RegistrationHandler {

    
    public async prepareRegistrationData(email: string, password: string) {
        const encryptedPassword = await encrypt(trim(password))
        const encryptedEmain = trim(email).toLowerCase()
        return {
            email: encryptedEmain,
            encryptedPassword: encryptedPassword,
        }
    }
}

export const registrationHandler = new RegistrationHandler();