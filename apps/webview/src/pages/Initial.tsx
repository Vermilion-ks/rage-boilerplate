import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import rpc from '@/utils/rpc'
import notification from '@/utils/notification'
import { useTranslation } from 'react-i18next'
import { NotificationType } from '@rage/shared'

const Initial: FC = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    useEffect(() => {
        rpc.register<string>('Browser-ShowPage', (page, data) => {
            navigate(page, { state: data })
        })
        rpc.register<{ type: NotificationType; message: string }>('Browser-Notification', (data) => {
            notification(data.type, t(data.message))
        })
    }, [])

    return <></>
}

export default Initial
