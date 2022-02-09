export const loadData = (name) => {
    const stringData = localStorage.getItem(name)

    return stringData ? JSON.parse(stringData) : null
}

export const saveData = (name, data) => {
    const jsonData = JSON.stringify(data)
    localStorage.setItem(name, jsonData)
}
