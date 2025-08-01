import { CSSProperties, FC } from 'react'

import style from './style.module.scss'

type Props = {
    min: number
    max: number
    step: number
    onChange?: ( value: number ) => void
    containerStyle?: CSSProperties
    defaultValue?: number
}

const RangeSelector: FC<Props> = ( {
    min,
    max,
    step,
    onChange,
    containerStyle,
    defaultValue,
} ) => {
    return (
        <div
            className={style.wrapper}
            style={{ position: 'relative', ...containerStyle }}
        >
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={defaultValue}
                onChange={e => ( onChange ? onChange( +e.target.value ) : null )}
                className={style.range}
            />
        </div>
    )
}

export default RangeSelector
