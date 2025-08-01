import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components'
import s from './style.module.scss'

import recoveryIcon from '@/assets/recovery.svg'

type Props = {
    readonly status: number
    setActiveTab: React.Dispatch<React.SetStateAction<number>>
}

const TabSwitcher: FC<Props> = ({ status, setActiveTab }) => {
    const tabs = [
        { id: 0, translation: 'authorization' },
        { id: 1, translation: 'registration' },
        { id: 2, translation: 'passRecovery' },
    ]
    const { t } = useTranslation()

    return (
        <div className={s.tabSwitcher}>
            {tabs.map((tab, index) => (
                <Button
                    containerStyle={
                        tab.id === 2
                            ? {
                                  width: '60px',
                                  opacity: '0.7',
                                  padding: 0,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }
                            : { flex: 1 }
                    }
                    variation={'OPACITY'}
                    onClick={() => setActiveTab(tab.id)}
                    isActive={tab.id === status}
                    key={index}
                >
                    {tab.id === 2 ? (
                        <img src={recoveryIcon} alt="Recovery Icon" />
                    ) : (
                        t(`auth.${tab.translation}`)
                    )}
                </Button>
            ))}
        </div>
    )
}

export default TabSwitcher
