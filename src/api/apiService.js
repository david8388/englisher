import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export const getWords = () => request.get('/word')
export const getTotal = () => request.get('/word/total')
export const getCreated = () => request.get('/word/created')
export const getWordsWithFilter = (startDate, endDate) => request.get(`/word?startDate=${startDate}&endDate=${endDate}`)
export const getRandomWords = (count) => request.get(`/word/random?count=${count}`)
export const saveWord = data => request.post('/word', data)
