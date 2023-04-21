import axios from 'axios';

const GET_ACCESS_TOKEN = 'https://www.universal-tutorial.com/api/getaccesstoken';
const GET_ADDRESS = 'https://www.universal-tutorial.com/api/';

export const accessToken = axios.create({ baseURL: GET_ACCESS_TOKEN });
export const getAddress = axios.create({ baseURL: GET_ADDRESS });
