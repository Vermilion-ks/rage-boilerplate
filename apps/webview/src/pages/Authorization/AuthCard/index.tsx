import { FC, ReactNode } from 'react'
import { Header } from '@/components'
import s from './style.module.scss'

type Props = {
    title: string
    children: ReactNode
}

const AuthCard: FC<Props> = ({ title, children }) => {

    return (
        <div className={s.container}>
            <Header

            >
                {title}
            </Header>
            {children}
        </div>
    )
}

export default AuthCard
