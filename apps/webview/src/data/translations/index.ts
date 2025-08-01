import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from '@rage/shared'

import IconEn from '@/assets/flag_usa.png'
import IconUa from '@/assets/flag_ukraine.png'
import IconRu from '@/assets/flag_russia.png'

export const languages: LanguageValue[] = [
    { id: 0, slug: 'en', name: 'English', icon: IconEn },
    { id: 1, slug: 'ua', name: 'Ukraine', icon: IconUa },
    { id: 2, slug: 'ru', name: 'Russian', icon: IconRu },
]

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: translations,
        lng: languages[0].slug, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    })
    .then(r => r)

export default i18n

export function changeLanguage(lang: LanguageValue['slug']) {
    return new Promise((res, rej) => {
        i18n.changeLanguage(lang)
            .then(() => res('languageChange'))
            .catch(() => rej('languageFailed'))
    })
}

export type LanguageValue = {
    id: number
    slug: 'ua' | 'en' | 'ru'
    name: string
    icon: string
}
