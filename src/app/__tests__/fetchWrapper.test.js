import fetchWrapper from '../fetchWrapper'

describe('fetchWrapper retry', () => {
    // TODO: make this test file DRY
    beforeEach(() => {
        fetch.resetMocks()
    })

    it('Calls API once on successful response', async () => {
        fetch.mockResponse(
            JSON.stringify({
                success: true,
            })
        )

        await fetchWrapper.get('http://localhost', {
            maxRetries: 3,
        })
        expect(fetch).toHaveBeenCalledTimes(1)
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

describe('Response', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })

    it("It doesn't fails on null response body", async () => {
        fetch.mockResponse(null)

        try {
            const response = await fetchWrapper.get('http://localhost')
            expect(response).toEqual({})
        } catch (error) {
            expect(error).not.toBeTruthy()
        }
    })

    it("It doesn't fails on empty string response body", async () => {
        fetch.mockResponse('')

        try {
            const response = await fetchWrapper.get('http://localhost')
            expect(response).toEqual({})
        } catch (error) {
            expect(error).not.toBeTruthy()
        }
    })
})
