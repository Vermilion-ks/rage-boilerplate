import { toast, ToastOptions } from 'react-hot-toast'
import { Notification as NotificationType } from '@rage/shared'

const baseOptions: ToastOptions = {
    style: {
        background: '#333333c8',
        color: '#fff',
        borderRadius: 4,
        textAlign: 'center',
        width: '700px',
    },
    duration: 4000,
}

const successOptions: ToastOptions = {
    ...baseOptions,
    style: {
        ...baseOptions.style,
        border: '1px solid #4CAF50',
    },
}

const errorOptions: ToastOptions = {
    ...baseOptions,
    style: {
        ...baseOptions.style,
        border: '1px solid #F44336',
    },
}

const warningOptions: ToastOptions = {
    ...baseOptions,
    style: {
        ...baseOptions.style,
        border: '1px solid #FF9800',
    },
}

const loadingOptions: ToastOptions = {
    ...baseOptions,
    style: {
        ...baseOptions.style,
        border: '1px solid #2196F3',
    },
}


export function notification(
    type:
        | NotificationType
        | 'success'
        | 'error'
        | 'warning'
        | 'loading',
    message: string,
) {
    switch (type) {
        case 'success':
            return success(message)
        case 'error':
            return error(message)
        case 'warning':
            return warning(message)
        case 'loading':
            return loading(message)
    }
}

function success(message: string) {
    toast.success(message, successOptions)
}

function error(message: string) {
    toast.error(message, errorOptions)
}

function warning(message: string) {
    toast(message, warningOptions)
}

function loading(message: string) {
    toast.loading(message, loadingOptions)
}

export default notification
export type Notification = NotificationType
