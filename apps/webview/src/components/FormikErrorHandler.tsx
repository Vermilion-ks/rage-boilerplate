import { FC, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import notification from '@/utils/notification'

const FormikErrorHandler: FC = () => {
    const formik = useFormikContext()
    const { t } = useTranslation()

    useEffect(() => {
        if (formik.isSubmitting) return
        if (!Object.keys(formik.errors).length) return

        const errorMsg = Object.values(formik.errors)[0]
        console.log(errorMsg)

        notification('error', t(`notification.${errorMsg}`))
    }, [formik.isSubmitting])

    return null
}

export default FormikErrorHandler
