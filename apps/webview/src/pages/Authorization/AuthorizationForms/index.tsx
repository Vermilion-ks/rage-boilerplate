import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'

import rpc from '@/utils/rpc'
import { loginSchema, LoginSchemaType } from '@/data/validation'
import { Button, Input, FormikErrorHandler } from '@/components'
import AuthCard from '../AuthCard'
import notification from '@/utils/notification.ts'

type Props = {
    email: string
    handleLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthorizationForms: FC<Props> = ({ email, handleLogin }) => {
    const { t } = useTranslation()

    return (
        <>
            <AuthCard title={t('auth.authorization')}>
                <Formik
                    initialValues={{
                        email,
                        password: '',
                    }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {props => (
                        <>
                            <FormikErrorHandler />
                            <Input
                                label={t('auth.email')}
                                defaultValue={props.values.email}
                                onChange={props.handleChange('email')}
                                isValid={
                                    props.touched.email && !props.errors.email
                                }
                                containerStyle={
                                    props.touched.email && props.errors.email
                                        ? {
                                            backgroundColor:
                                                'rgba(255,0,0,0.1)',
                                        }
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
                                containerStyle={
                                    props.touched.password &&
                                        props.errors.password
                                        ? {
                                            backgroundColor:
                                                'rgba(255,0,0,0.1)',
                                        }
                                        : {}
                                }
                                isPassword
                            />
                            <Button
                                variation={'GREEN_GLOW'}
                                onClick={props.handleSubmit}
                            >
                                {t('auth.login')}
                            </Button>
                        </>
                    )}
                </Formik>
            </AuthCard>
        </>
    )

    function handleSubmit(values: LoginSchemaType) {
        rpc.callServer('Auth-SignIn', Object.values(values))
            .then(() => {
                handleLogin(true)
                return new Promise(resolve => setTimeout(resolve, 1000))
            })
            .then(() => rpc.callClient('Auth-SuccessLogin', values.email))
            .catch(e => notification(e.type, e.message))
    }
}

export default AuthorizationForms
