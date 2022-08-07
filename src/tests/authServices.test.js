import { authUser, getUser } from './../services/authService';
import  axios  from 'axios';
import MockAdapter from "axios-mock-adapter"

test('should return jwt from the database', async () => {
  const {REACT_APP_APIURL} = process.env;
  const URL = REACT_APP_APIURL;
  const fakeJWT = "fake jwt";
  const mock = new MockAdapter(axios);
  mock.onPost(URL + "/auth").reply(200, fakeJWT);
  const response = await authUser("email", "password");
  expect(response).toBe(fakeJWT);
})

test('should return jwt from the sessionStorage', () => {
  sessionStorage.setItem("jwt","some fake token");
  expect(getUser()).toBe("some fake token");
})








