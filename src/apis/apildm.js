import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5500/'
  //baseURL: 'https://backend-ldm-firebase.herokuapp.com/'
})
