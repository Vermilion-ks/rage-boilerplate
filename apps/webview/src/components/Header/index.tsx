import { CSSProperties, FC } from 'react'

import s from './style.module.scss'
import { Variants, variantResult } from '@/components/Header/utils.ts'

type Props = {
    children: React.ReactNode
    preheader?: string
    postheader?: {
        content: string | React.ReactNode
        width?: number
        style?: CSSProperties
    }
    variant?: keyof typeof Variants
    headerStyle?: CSSProperties
    containerStyle?: CSSProperties
    headerClasses?: {
        container?: string
        header?: string
    }
}

const Header: FC<Props> = ({
    children,
    preheader,
    postheader,
    variant,
    headerStyle,
    containerStyle,
    headerClasses,
}) => {
    const selectedVariant = variantResult(variant)

    return (
        <header className={headerClasses?.container} style={containerStyle}>
            {preheader && <span className={s.preheader}>{preheader}</span>}
            <h1 className={selectedVariant} style={{ ...headerStyle }}>
                {children}
            </h1>
            {postheader && (
                <span
                    className={`${s.postheader} ${headerClasses?.header}`}
                    style={{
                        maxWidth: `${postheader.width ?? 100}%`,
                        ...postheader.style,
                    }}
                >
                    {postheader.content}
                </span>
            )}
        </header>
    )
}

export default Header
