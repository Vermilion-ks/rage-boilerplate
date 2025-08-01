import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import rpc from '@/utils/rpc'
import { Button } from '@/components'
import { languages, changeLanguage, LanguageValue } from '@/data/translations'
import s from './style.module.scss'
import notification from '@/utils/notification.ts'

type Props = {
    language: string
}

const LanguageSwitcher: FC<Props> = ({ language }) => {
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (language && i18n.language !== language) {
            i18n.changeLanguage(language).catch(error =>
                console.error('Error changing language:', error),
            )
        }
    }, [language, i18n])

    return (
        <section className={s.container}>
            <div className={s.languages}>
                {languages.map(item => (
                    <Button
                        children={item.name}
                        onClick={() => {
                            handleLanguageChange(item.slug)
                        }}
                        isActive={i18n.language === item.slug}
                        icon={item.icon}
                        containerStyle={{ padding: '0 14px', gap: '15px' }}
                        variation={'OPACITY'}
                        key={item.slug}
                    />
                ))}
            </div>
        </section>
    )

    function handleLanguageChange(lang: LanguageValue['slug']) {
        changeLanguage(lang)
            .then(res => notification('success', t(`notification.${res}`)))
            .catch(rej => notification('error', t(`notification.${rej}`)))
        rpc.callServer('Auth-SuccessChangeLanguage', lang)
        rpc.callClient('Auth-SavePlayerLanguage', lang)
    }
}

export default LanguageSwitcher
