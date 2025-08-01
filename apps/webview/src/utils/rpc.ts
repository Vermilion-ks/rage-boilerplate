class RPC {
    async register<T = unknown, N = unknown>(
        name: string,
        callback: (...args: [T, ...N[]]) => void,
    ) {
        if (import.meta.env.MODE !== 'development') {
            const rpc = await import('rage-rpc')
            rpc.register(name, (data: [T, ...N[]]) => {
                return Array.isArray(data) ? callback(...data) : callback(data)
            })
        }
    }
    async unregister(name: string) {
        if (import.meta.env.MODE !== 'development') {
            const rpc = await import('rage-rpc')
            rpc.unregister(name)
        }
    }
    async callServer(name: string, args?: unknown) {
        if (import.meta.env.MODE !== 'development') {
            const rpc = await import('rage-rpc')
            const response = await rpc.callServer(name, args)
            return response?.err ? Promise.reject(response.err) : response
        }
    }
    async callClient(name: string, args?: unknown) {
        if (import.meta.env.MODE !== 'development') {
            const rpc = await import('rage-rpc')
            const response = await rpc.callClient(name, args)
            return response?.err ? Promise.reject(response.err) : response
        }
    }
}

export default new RPC()
