import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import rpc from 'rage-rpc'


const Initial: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        rpc.register('Browser-ShowPage', (page, data) => {
            navigate(page, { state: data })
        })
    }, [])

    return <></>
}

export default Initial
