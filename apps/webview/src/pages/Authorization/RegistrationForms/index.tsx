import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'

import rpc from '@/utils/rpc'
import { notification } from '@/utils/notification'
import { registerSchema, RegisterSchemaType } from '@/data/validation.ts'
import { Button, FormikErrorHandler, Input } from '@/components'
import AuthCard from '../AuthCard'

type Props = {
    email: string
    onTabSwitch: (tabId: number) => void
}

const RegistrationForms: FC<Props> = ({ email, onTabSwitch }) => {
    const { t } = useTranslation()

    return (
        <AuthCard title={t('auth.registration')}>
            <Formik
                initialValues={
                    {
                        email,
                        confirmationCode: '',
                        password: '',
                        repeatPassword: '',
                    } as RegisterSchemaType
                }
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {props => (
                    <>
                        <FormikErrorHandler />
                        <Input
                            label={t('auth.email')}
                            defaultValue={props.values.email}
                            onChange={props.handleChange('email')}
                            isValid={props.touched.email && !props.errors.email}
                            containerStyle={
                                props.touched.email && props.errors.email
                                    ? { backgroundColor: 'rgba(255,0,0,0.1' }
                                    : {}
                            }
                        />
                        <Input
                            label={t('auth.password')}
                            placeholder={'********'}
                            onChange={props.handleChange('password')}
                            isValid={
                                props.touched.password &&
                                !props.errors.password
                            }
                            isPassword
                            containerStyle={
                                props.touched.password &&
                                    props.errors.password
                                    ? {
                                        backgroundColor:
                                            'rgba(255,0,0,0.1',
                                    }
                                    : {}
                            }
                        />
                        <Input
                            label={t('auth.password')}
                            placeholder={'********'}
                            onChange={props.handleChange(
                                'repeatPassword',
                            )}
                            isValid={
                                props.touched.repeatPassword &&
                                !props.errors.repeatPassword
                            }
                            isPassword
                            containerStyle={
                                props.touched.repeatPassword &&
                                    props.errors.repeatPassword
                                    ? {
                                        backgroundColor:
                                            'rgba(255,0,0,0.1',
                                    }
                                    : {}
                            }
                        />
                        <Button
                            variation={'GREEN_GLOW'}
                            onClick={props.handleSubmit}
                        >
                            {t('auth.create')}
                        </Button>
                    </>
                )}
            </Formik>
        </AuthCard>
    )

    async function handleSubmit(values: RegisterSchemaType) {
        const data = {
            email: values.email.trim().toLowerCase(),
            password: values.password.trim(),
        }

        const response = await rpc.callServer('Auth-SignUp', data)
            .catch(e => notification(e.type, e.message))
        if (response) {
            notification('success', t(`notification.successRegister`))
            onTabSwitch(0)
        }
    }

}

export default RegistrationForms
