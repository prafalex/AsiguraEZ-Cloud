import axios from 'axios'

const useDeleteInsured = () => {
    const deleteUser = async (user) => {
        try {
            const userConfirmed = window.confirm(`Are you sure you want to delete the insured ${user.firstName}?`)
            if (userConfirmed) {
                const res = await axios.delete(`http://127.0.0.1:5000/insured/${user.id}`)
                alert(res.data.message)
            } else alert('You\'ve revoked the action to delete the user.')
        } catch (err) {
            console.error('Error deleting user: ', err)
        }
    }

    return { deleteUser }
}

export default useDeleteInsured