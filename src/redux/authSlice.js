import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import fetchWrapper from '../app/fetchWrapper'

const initialState = {
    user: {},
    logged: sessionStorage.getItem('logged') === 'true' || false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                state.user = action.payload.data
                state.logged = true
                sessionStorage.setItem('logged', 'true')
            }
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            if (action.payload.success !== false) {
                state.user = {}
                state.logged = false
                sessionStorage.setItem('logged', 'false')
            }
        })

        builder.addCase(updateUser.fulfilled, (state, action) => {
            if (action.payload.success === true) {
                state.user = action.payload.data
            }
        })
    },
})

export const logIn = createAsyncThunk(
    'login',
    async (userData = {}, { rejectWithValue }) => {
        try {
            await fetchWrapper.get(
                'http://boonote.test:8000/sanctum/csrf-cookie'
            )

            const res = await fetchWrapper.post(
                'http://boonote.test:8000/login',
                {
                    body: JSON.stringify(userData),
                }
            )

            return await res.json()
        } catch (error) {
            const errorData = {
                ...error,
            }
            if (error.message === 'Connection error') {
                errorData.message =
                    error.message +
                    ': please check your internet connection and/or try again'
            }

            return rejectWithValue(errorData)
        }
    }
)

export const logout = createAsyncThunk('logout', async () => {
    const res = await fetchWrapper.delete('http://boonote.test:8000/logout')
    return await res.json()
})

export const signUp = createAsyncThunk(
    'signup',
    async (userData = {}, { rejectWithValue }) => {
        try {
            const res = await fetchWrapper.post(
                'http://boonote.test:8000/register',
                {
                    body: JSON.stringify(userData),
                }
            )

            return await res.json()
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await fetchWrapper.put(
                'http://boonote.test:8000/api/profile',
                {
                    body: JSON.stringify(userData),
                }
            )

            return await res.json()
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export default authSlice.reducer
