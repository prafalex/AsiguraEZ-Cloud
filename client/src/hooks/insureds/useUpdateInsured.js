import axios from 'axios'

const useUpdateInsured = () => {
    const updateInsured = async (data) => {
        try {
            const dataToServer = {
                first_name: data.firstname,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address   
            }

            await axios.put(`http://104.199.60.93/insured/${data.id}`, dataToServer)
            .then(() => {
                window.location.href = '/insureds/'
            })
        } catch (err) {
            console.error(err)
        }
    }

    return { updateInsured }
}

export default useUpdateInsured