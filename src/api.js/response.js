//const axios = require('axios').default;
import axios from "axios"

const response = async (url, obj) => {
    const data = await axios.get(url, obj)
    let finalResponse = []
    if(data && data.data && data.data.length){
        finalResponse =  data.data
    } 
    return finalResponse
}

export default response