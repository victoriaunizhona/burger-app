import axios from 'axios';

const  instance = axios.create({baseURL: 'https://burger-app-f0331-default-rtdb.firebaseio.com'});

export default instance;
