import * as yup from 'yup'

// TODO: validation

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
    confirmationCode: string
    password: string
    repeatPassword: string
}

const registerSchema = yup.object<RegisterSchemaType>({
    email: yup.string().required('emailRequired').min(6).email('emailInvalid'),
    confirmationCode: yup.string().required('codeRequired').length(8),
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

const graffitySchema = yup.object({
    text: yup
        .string()
        .required('textMissing')
        .min(3, 'textMissing')
        .matches(/^[a-zA-Z]+$/, 'onlyLatinLetters'),
})

type GraffitySchemaType = {
    text: string
}

export {
    loginSchema,
    registerSchema,
    recoverSchema,
    characterNameSchema,
    graffitySchema,
}
export type {
    RegisterSchemaType,
    LoginSchemaType,
    RecoverSchemaType,
    CharacterNameSchemaType,
    GraffitySchemaType,
}
