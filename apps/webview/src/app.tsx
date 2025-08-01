import Router from './routes'
import { Toaster } from 'react-hot-toast'
import './data/styles/index.scss'
export function App() {
    return (
        <>

            <Router />
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 5_000,
                    style: {
                        boxShadow: 'none',
                        background: 'none',
                        padding: 10,
                        margin: 0,
                        maxWidth: '400px',
                        minHeight: '50px',

                    },
                    className: 'w-95',
                }}
                containerClassName={'ignore-old-styles'}
            />
        </>
    )
}
