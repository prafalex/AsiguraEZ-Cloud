import axios from 'axios'

const useInsertInsured = () => {
    const insertInsured = async (data) => {
        try {
            const dataToServer = {
                first_name: data.firstname,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address   
            }

            await axios.post('http://127.0.0.1:5000/insured', dataToServer)
        } catch (err) {
            console.error(err)
        }
    }

    return { insertInsured }
}

export default useInsertInsured