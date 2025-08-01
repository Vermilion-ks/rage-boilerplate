import { CSSProperties, FC, ReactNode } from 'react'

import style from './style.module.scss'

export type ButtonsVariations = 'GREEN_GLOW' | 'ORANGE_GLOW' | 'OPACITY'
type Props = (
    | {
          children: ReactNode
          onClick: () => void
          containerStyle?: CSSProperties
          disabled?: boolean
          forwardButtonEvent?: false
      }
    | {
          children: ReactNode
          onClick: (
              e?:
                  | React.MouseEvent<HTMLButtonElement, MouseEvent>
                  | React.MouseEvent<HTMLDivElement, MouseEvent>,
          ) => void
          disabled?: boolean
          containerStyle?: CSSProperties
          forwardButtonEvent?: true
      }
) &
    (
        | {
              variation: Exclude<ButtonsVariations, 'OPACITY'>
          }
        | {
              variation: Extract<ButtonsVariations, 'OPACITY'>
              isActive?: boolean
              icon?: string
          }
    )

type UnsafeProps = {
    children: ReactNode
    onClick: Props['onClick']
    containerStyle?: CSSProperties
    variation: ButtonsVariations
    isActive?: boolean
    icon?: string
    disabled?: boolean
    forwardButtonEvent?: boolean
}

const Button: FC<Props> = ({
    variation,
    children,
    onClick,
    isActive,
    icon,
    disabled,
    containerStyle,
    forwardButtonEvent = false,
}: UnsafeProps) => {
    return (
        <>
            {variation === 'GREEN_GLOW' ? (
                <GreenGlow
                    text={children}
                    onClick={onClick}
                    containerStyle={containerStyle}
                    disabled={disabled}
                />
            ) : variation === 'ORANGE_GLOW' ? (
                <OrangeGlow
                    text={children}
                    onClick={e => (forwardButtonEvent ? onClick(e) : onClick())}
                    containerStyle={containerStyle}
                    disabled={disabled}
                />
            ) : (
                <Opacity
                    text={children}
                    onClick={e => (forwardButtonEvent ? onClick(e) : onClick())}
                    isActive={isActive}
                    icon={icon}
                    containerStyle={containerStyle}
                    disabled={disabled}
                />
            )}
        </>
    )
}

type ButtonProp = {
    text: ReactNode
    onClick: Props['onClick']
    isActive?: boolean
    icon?: string
    disabled?: boolean
    containerStyle?: CSSProperties
    scaleOnHover?: boolean
}

const GreenGlow: FC<ButtonProp> = ({
    text,
    onClick,
    containerStyle,
    disabled,
    scaleOnHover = false,
}) => {
    return (
        <div
            style={containerStyle}
            onClick={e => {
                if (!disabled) onClick(e)
            }}
            className={`${style.glow_wrapper} ${style.green_glow} ${scaleOnHover ? style.scaleOnHover : ''}`}
        >
            {text}
        </div>
    )
}

const OrangeGlow: FC<ButtonProp> = ({
    text,
    onClick,
    containerStyle,
    disabled,
}) => {
    return (
        <button
            style={containerStyle}
            onClick={e => onClick(e)}
            disabled={disabled}
            className={`${style.glow_wrapper} ${style.orange_glow}`}
        >
            {text}
        </button>
    )
}

const Opacity: FC<ButtonProp> = ({
    text,
    onClick,
    isActive,
    icon,
    disabled,
    containerStyle,
}) => {
    return (
        <button
            style={containerStyle}
            onClick={e => onClick(e)}
            disabled={disabled}
            className={`${style.opacity} ${
                isActive ? style.opacity_active : ''
            }`}
        >
            {icon && (
                <img className={style.button_icon} src={icon} alt={'icon'} />
            )}
            {text}
        </button>
    )
}

export default Button
