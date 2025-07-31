// sort-imports-ignore
import { Toaster } from 'react-hot-toast'

export function App() {

    return (
        <>

            Hello RAGE
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 5_000,
                    style: {
                        boxShadow: 'none',
                        background: 'none',
                        padding: 0,
                        margin: 0,
                        maxWidth: 'unset',
                    },
                    className: 'w-95',
                }}
                containerClassName={'ignore-old-styles'}
            />
        </>
    )
}
