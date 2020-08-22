import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export const getWords = () => request.get('/word')
export const getWordsWithFilter = (startDate, endDate) => request.get(`/word?startDate=${startDate}&endDate=${endDate}`)
export const getRandomWords = () => request.get('/word/random')
export const saveWord = data => request.post('/word', data)
