import { CSSProperties, FC, useRef, useState } from 'react'
import style from './style.module.scss'
import GreenMarkIcon from '@/assets/icon_green_mark.svg'
import EyeVisibleIcon from '@/assets/icon_eye_visible.svg'
import EyeCrossedIcon from '@/assets/icon_eye_crossed.svg'

type Props = {
    label: string
    onChange: (e: string) => void
    defaultValue?: string
    placeholder?: string
    isValid?: boolean
    isPassword?: boolean
    containerStyle?: CSSProperties
    labelStyle?: CSSProperties
}

const Input: FC<Props> = ({
    label,
    onChange,
    defaultValue,
    placeholder = '',
    isValid = false,
    isPassword = false,
    containerStyle = {},
    labelStyle = {},
}) => {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const PasswordToggleImage = isHidden ? EyeVisibleIcon : EyeCrossedIcon

    const inputRef = useRef<HTMLInputElement>(null)
    const [inputFocused, setInputFocused] = useState(false)

    const InputField = (
        <input
            size={1}
            id={label}
            type={isPassword && isHidden ? 'password' : 'text'}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={style.input}
            ref={inputRef}
            onChange={e => onChange(e.target.value)}
            onFocus={_ => setInputFocused(true)}
            onBlur={_ => setInputFocused(false)}
        />
    )

    return (
        <div
            className={`${style.input_root} ${inputFocused ? style.focused : ''}`}
            style={{ display: 'flex', flexDirection: 'row', ...containerStyle }}
            onClick={() => inputRef.current?.focus()}
        >
            <div className={style.input_wrapper}>
                {isValid && (
                    <img
                        width={16}
                        height={16}
                        className={style.green_mark}
                        src={GreenMarkIcon}
                        alt="validation indicator"
                    />
                )}

                <label
                    className={style.label}
                    htmlFor={label}
                    style={labelStyle}
                >
                    {label}
                </label>

                {InputField}
            </div>

            <div className={style.password_show_wrapper} onClick={handleClick}>
                {isPassword && (
                    <img
                        src={PasswordToggleImage}
                        width={24}
                        height={24}
                        alt="toggle password visibility"
                    />
                )}
            </div>
        </div>
    )

    function handleClick() {
        setIsHidden(!isHidden)
    }
}

export default Input
