import { getCookie } from './cookies'

const handleErrors = (e) => {
    if (e instanceof TypeError) {
        return new Error('Connection error')
    } else {
        return e
    }
}

const sendRequest = async (url, options = {}, retryCount = 1) => {
    const { maxRetries = 0, headers, ...restOptions } = options

    try {
        const raw = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials: 'include',
            ...restOptions,
        })

        if (raw.status >= 200 && raw.status <= 299) {
            return raw
        } else {
            return Promise.reject(await raw.json())
        }
    } catch (e) {
        if (retryCount < maxRetries) {
            return sendRequest(url, options, retryCount + 1)
        }

        return Promise.reject(handleErrors(e))
    }
}

export default {
    get: async (url, options = {}) => {
        return await sendRequest(url, {
            method: 'GET',
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
                'X-Requested-With': 'XMLHttpRequest',
            },
            ...options,
        })
    },
    post: async (url, options = {}) => {
        return await sendRequest(url, {
            method: 'POST',
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
                'X-Requested-With': 'XMLHttpRequest',
            },
            ...options,
        })
    },
    delete: async (url, options = {}) => {
        return await sendRequest(url, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
                'X-Requested-With': 'XMLHttpRequest',
            },
            ...options,
        })
    },
    put: async (url, options = {}) => {
        return await sendRequest(url, {
            method: 'PUT',
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(getCookie('XSRF-TOKEN')),
                'X-Requested-With': 'XMLHttpRequest',
            },
            ...options,
        })
    },
}
