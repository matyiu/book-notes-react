import { useState } from 'react'

const useNote = (defaultData = {}) => {
    const [note, setNote] = useState(defaultData)
    const changeNote = (changes) => {
        setNote({ ...note, ...changes })
    }

    return [note, changeNote]
}

export default useNote
