import s from '@/components/Header/style.module.scss'

export enum Variants {
    GREEN = 'GREEN',
    ORANGE = 'ORANGE',
    WHITE = 'WHITE',
}
export const variantResult = (variant?: keyof typeof Variants) => {
    switch (variant) {
        case Variants.ORANGE:
            return s.orange

        case Variants.WHITE:
            return s.white

        case Variants.GREEN:
        default:
            return s.green
    }
}
