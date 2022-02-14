import fetchWrapper from './fetchWrapper'
import store from './store'

const initData = async () => {
    if (!store.getState().auth.logged) {
        return
    }
    const notesRes = await fetchWrapper.get(
        'http://boonote.test:8000/api/notes'
    )
    const authorsRes = await fetchWrapper.get(
        'http://boonote.test:8000/api/user/authors'
    )
    const categoriesRes = await fetchWrapper.get(
        'http://boonote.test:8000/api/user/categories'
    )

    const notes = await notesRes.json()
    const authors = await authorsRes.json()
    const categories = await categoriesRes.json()

    return { notes, authors, categories }
}

export default initData
