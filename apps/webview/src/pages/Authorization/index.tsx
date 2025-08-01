import { FC, useState } from 'react'
import { useLocation } from 'react-router'
import s from './style.module.scss'

import TabSwitcher from './TabSwitcher'
import LanguageSwitcher from './LanguageSwitcher'
import AuthorizationForms from './AuthorizationForms'
import RecoveryForms from './RecoveryForms'
import RegistrationForms from './RegistrationForms'

type State = {
    email: string
    language: string
}

const Auth: FC = () => {
    const state = useLocation().state as State
    const [isDisappearing, setIsDisappearing] = useState(false)
    const [email] = useState(state?.email ?? '')
    const [language] = useState(state?.language ?? 'en')
    const [activeTab, setActiveTab] = useState(0)
    const handleTabSwitch = (tabId: number) => {
        setActiveTab(tabId)
    }
    return (
        <main className={s.container}>
            <section
                className={`${s.leftPanel} ${isDisappearing ? s.leftPanelSlideOut : ''}`}
            >
                <TabSwitcher status={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 0 ? (
                    <AuthorizationForms
                        email={email}
                        handleLogin={setIsDisappearing}
                    />
                ) : activeTab === 2 ? (
                    <RecoveryForms
                        email={email}
                        onTabSwitch={handleTabSwitch}
                    />
                ) : (
                    <RegistrationForms
                        email={email}
                        onTabSwitch={handleTabSwitch}
                    />
                )}
                <LanguageSwitcher language={language} />
            </section>
        </main>
    )
}

export default Auth
