import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/vuemastery',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
})

export default {
  getEvents(page) {
    return apiClient.get('/events?page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
