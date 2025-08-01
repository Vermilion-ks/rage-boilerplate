import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'

import { recoverSchema, RecoverSchemaType } from '@/data/validation.ts'
import { Button, FormikErrorHandler, Input } from '@/components'
import AuthCard from '../AuthCard'
import rpc from '@/utils/rpc'
import notification from '@/utils/notification.ts'

type Props = {
    email: string
    onTabSwitch: (tabId: number) => void
}

const RecoveryForms: FC<Props> = ({ email, onTabSwitch }) => {
    const { t } = useTranslation()
    const [codeSend, setCodeSend] = useState<boolean>(false)

    return (
        <AuthCard title={t('auth.passRecovery')}>
            <Formik
                initialValues={{
                    email,
                    confirmationCode: '',
                    password: '',
                }}
                validationSchema={recoverSchema}
                onSubmit={handleFormSubmit}
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
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 12,
                            }}
                        >
                            {!codeSend ? (
                                <Button
                                    variation={'GREEN_GLOW'}
                                    onClick={() =>
                                        handleSendCode(props.values.email)
                                    }
                                    containerStyle={{
                                        flex: 1,
                                        height: '100%',
                                        textAlign: 'center',
                                    }}
                                >
                                    {t('auth.sendCode')}
                                </Button>
                            ) : null}
                        </div>
                        {codeSend ? (
                            <>
                                <Input
                                    label={t('auth.code')}
                                    containerStyle={
                                        props.touched.password &&
                                        props.errors.password
                                            ? {
                                                  backgroundColor:
                                                      'rgba(255,0,0,0.1',
                                              }
                                            : {}
                                    }
                                    onChange={props.handleChange(
                                        'confirmationCode',
                                    )}
                                    isValid={
                                        props.touched.confirmationCode &&
                                        !props.errors.confirmationCode
                                    }
                                />
                                <Input
                                    label={t('auth.newPassword')}
                                    placeholder={'********'}
                                    defaultValue={props.values.password}
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
                                <Button
                                    variation={'GREEN_GLOW'}
                                    onClick={props.handleSubmit}
                                >
                                    {t('auth.passRecovery')}
                                </Button>
                            </>
                        ) : null}
                    </>
                )}
            </Formik>
        </AuthCard>
    )

    function handleSendCode(email: string) {
        rpc.callServer('Auth-GetResetCode', email.trim().toLowerCase())
            .then(() => {
                notification('success', t('notification.emailCheck'))
                setCodeSend(true)
            })

            .catch(e => notification(e.type, e.message))
    }

    function handleFormSubmit(props: RecoverSchemaType) {
        const data = {
            email: props.email.trim().toLowerCase(),
            password: props.password.trim(),
            code: props.confirmationCode.trim(),
        }

        rpc.callServer('Auth-ResetPassword', data)
            .then(() => {
                notification('success', 'Password was changed.') //TODO: Translation
                onTabSwitch(0)
            })
            .catch(e => notification(e.type, e.message))
    }
}

export default RecoveryForms
