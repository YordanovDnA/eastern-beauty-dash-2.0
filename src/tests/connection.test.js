//Testing the backend connection
import axios from 'axios';

test('should return 200 if backend is runing', async() => {
  const {REACT_APP_APIURL} = process.env;
  const URL = REACT_APP_APIURL;
  const result = await axios.get(`${URL}/herbs`)
  
  expect(result.status).toBe(200)
})
