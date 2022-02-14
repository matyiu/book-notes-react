export default (map) => {
    return Array.from(map, ([key, value]) => ({ id: key, name: value }))
}
