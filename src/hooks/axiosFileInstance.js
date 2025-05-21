import axios from 'axios';

const apiUrl =  process.env.NODE_ENV !== 'production' ? 
            process.env.REACT_APP_BASE_DEV_URL :
                process.env.REACT_APP_BASE_PROD_URL

const options = {
  baseURL: `${apiUrl}/${process.env.REACT_APP_VERSION}`, // Set your API base URL
  // "Content-Type": 'multipart/form-data',
}



const axiosFileInstance = axios.create(options);

const checkToken = (token, userInfo) => {
  const url = userInfo.association ? '/association/profile' : '/user/profile'
  axios.get(`${apiUrl}/v1${url}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
      .then()
      .catch(err => {
        if(err.response.status === 401) {
          localStorage.removeItem("userData")
          window.location.href = '/auth/login';
          console.log(err.response);
          return
        }
      })
}

axiosFileInstance.interceptors.request.use(async req => {
  req.headers['Accept'] = 'application/json';
  req.headers['Content-Type'] = 'multipart/form-data';

  const user = JSON.parse(localStorage.getItem("userData"));

  const token = user?.token;

  if (token) {
    checkToken(token, user)
  }

  req.headers['Authorization'] = token ? `Bearer ${token}` : null;

  return req
})

axiosFileInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.data?.message ===  'Unauthenticated.') {
      localStorage.removeItem('userData')
      window.location.href = '/auth/login';
      return
    }
    return Promise.reject(error);
  }
);

export default axiosFileInstance;