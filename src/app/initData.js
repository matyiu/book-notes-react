import fetchWrapper from './fetchWrapper'
import store from './store'

const initData = async () => {
    if (!store.getState().auth.logged) {
        return
    }
    const notes = await fetchWrapper.get('http://boonote.test:8000/api/notes')
    const authors = await fetchWrapper.get(
        'http://boonote.test:8000/api/user/authors'
    )
    const categories = await fetchWrapper.get(
        'http://boonote.test:8000/api/user/categories'
    )

    return { notes, authors, categories }
}

export default initData
