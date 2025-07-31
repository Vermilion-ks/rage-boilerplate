import { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import {
    Auth,
    ExamplePage
} from '@/pages'
import Initial from '@/pages/Initial'

const Router: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={Initial} />

                <Route path="/auth" Component={Auth} />
                <Route path="/example" Component={ExamplePage} />
            </Routes>
        </HashRouter>
    )
}

export default Router
