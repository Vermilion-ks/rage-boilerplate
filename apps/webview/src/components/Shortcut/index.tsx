import { CSSProperties, FC } from 'react'
import s from './style.module.scss'

type Props = {
    label: string
    icon?: string
    keyboardKey: string
    onClick: () => void
    style?: CSSProperties
    className?: string
}
// todo add global listener for key to trigger onclick
const Shortcut: FC<Props> = ({
    label,
    icon,
    onClick,
    style = {},
    className = '',
}) => {
    return (
        <div
            className={`${s.shortcut} ${className}`}
            onClick={onClick}
            style={style}
        >
            {icon ? (
                <img src={icon} alt="" style={{ width: 16, height: 16 }} />
            ) : (
                label[0]
            )}
        </div>
    )
}

export default Shortcut
