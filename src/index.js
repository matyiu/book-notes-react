import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.scss'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { saveData } from './app/localStorage'
import initData from './app/initData'
import { setNotes } from './redux/notesSlice'
import { setTags } from './redux/tagsSlice'

store.subscribe(() => {
    saveData('boonote.notes', store.getState().notes)
    saveData('boonote.tags', store.getState().tags)
})

initData().then((res) => {
    if (res) {
        store.dispatch(setNotes(res.notes.data))
        store.dispatch(
            setTags({ author: res.authors.data, category: res.categories.data })
        )
    }
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
