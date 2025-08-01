import * as yup from 'yup'

type LoginSchemaType = {
    email: string
    password: string
}

const loginSchema = yup.object<LoginSchemaType>({
    email: yup
        .string()
        .required('emailRequired')
        .min(3, 'emailRequired')
        .email('emailInvalid'),
    password: yup.string().required('passwordShort').min(3, 'passwordShort'),
})

type RegisterSchemaType = {
    email: string
    password: string
    repeatPassword: string
}

const registerSchema = yup.object<RegisterSchemaType>({
    email: yup.string().required('emailRequired').min(6).email('emailInvalid'),
    password: yup.string().required('passwordShort').min(6, 'passwordShort'),
    repeatPassword: yup
        .string()
        .required('passwordNoMatch')
        .oneOf([yup.ref('password')], 'passwordNoMatch'),
})

type RecoverSchemaType = {
    email: string
    confirmationCode: string
    password: string
}

const recoverSchema = yup.object({
    email: yup.string().required('emailRequired').min(3).email('emailInvalid'),
    password: yup.string().required('passwordShort').min(3, 'passwordShort'),
    confirmationCode: yup.string().required('codeRequired'),
})

const characterNameSchema = yup.object({
    firstName: yup
        .string()
        .required('nameMissing')
        .min(3, 'nameMissing')
        .matches(/^[A-Za-z]+$/, 'onlyLatinLetters'),
    lastName: yup
        .string()
        .required('surnameMissing')
        .min(3, 'surnameMissing')
        .matches(/^[A-Za-z]+$/, 'onlyLatinLetters'),
})

type CharacterNameSchemaType = {
    firstName: string
    lastName: string
}



export {
    loginSchema,
    registerSchema,
    recoverSchema,
    characterNameSchema,
}
export type {
    RegisterSchemaType,
    LoginSchemaType,
    RecoverSchemaType,
    CharacterNameSchemaType,
}
