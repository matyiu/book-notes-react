import fetchWrapper from '../fetchWrapper'

describe('fetchWrapper retry', () => {
    // TODO: make this test file DRY
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('Calls API once on successful response', async () => {
        fetch.mockResponse({
            success: true,
        })

        try {
            await fetchWrapper.get('http://localhost', {
                maxRetries: 3,
            })
        } catch (error) {
            expect(fetch).toHaveBeenCalledTimes(1)
        }
    })

    it('Calls API once on reject', async () => {
        fetch.mockReject(new Error('Failure'))

        try {
            await fetchWrapper.get('http://localhost')
        } catch (error) {
            expect(fetch).toHaveBeenCalledTimes(1)
        }
    })

    it('Calls API once on error status code', async () => {
        fetch.mockResponse(
            {
                success: false,
            },
            {
                status: 500,
            }
        )

        try {
            await fetchWrapper.get('http://localhost')
        } catch (error) {
            expect(fetch).toHaveBeenCalledTimes(1)
        }
    })

    it('Calls API tree times on error status code', async () => {
        fetch.mockResponse(
            {
                success: false,
            },
            {
                status: 500,
            }
        )

        try {
            await fetchWrapper.get('http://localhost', {
                maxRetries: 3,
            })
        } catch (error) {
            expect(fetch).toHaveBeenCalledTimes(3)
        }
    })

    it('Calls API tree times on failure', async () => {
        fetch.mockReject(new Error('Failure'))

        try {
            await fetchWrapper.get('http://localhost', {
                maxRetries: 3,
            })
        } catch (error) {
            expect(fetch).toHaveBeenCalledTimes(3)
        }
    })
})
