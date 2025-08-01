import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import rpc from '@/utils/rpc'


const Initial: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        rpc.register<string>('Browser-ShowPage', (page, data) => {
            navigate(page, { state: data })
        })
    }, [])

    return <></>
}

export default Initial
