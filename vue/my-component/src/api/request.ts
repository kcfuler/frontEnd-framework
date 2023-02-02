import axios from 'axios'

const request = axios.create({
  baseURL: 'https://www.baidu.com',
  timeout: 1000,
})

export default request
