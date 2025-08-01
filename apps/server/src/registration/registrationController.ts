

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
           console.log('SignUp request received:', { player, email: data.email, password: data.password });
       }
}

export const registrationController = new RegistrationController();