import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../redux/authSlice'

export default () => {
    const history = useHistory()
    const dispatch = useDispatch()

    dispatch(logout()).then((res) => {
        if (res.payload.success !== false) {
            history.push('/login')
        }
    })

    return null
}
