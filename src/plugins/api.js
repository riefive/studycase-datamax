import axios from 'axios'

// based on https://www.thepolyglotdeveloper.com/2018/04/vuejs-app-using-axios-vuex/
export default (target, msec = 5) => {
    return axios.create({
        baseURL: target,
        timeout: msec * 1000,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}