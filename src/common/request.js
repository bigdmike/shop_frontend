import axios from 'axios';
import store from '@/store/index.js';
import router from '@/router';
import { getLocalStorage, delLocalStorage } from '@/common/cookie';

let baseURL = process.env.VUE_APP_BASE_API;
// 建立axios例項
const service = axios.create({
  baseURL: baseURL,
  timeout: 600000, // 請求超時時間
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    // 'content-type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    console.log(`message: ${data.msg}`);
    // showDialog(data.msg);
    if (error.response.status == 401) {
      router.push('/account/login');
      store.commit('SetDialog', {
        content: '會員憑證過期，請重新登入',
        status: true,
      });
    }
    if (error.response.status == 302) {
      delLocalStorage('account_token');
      store.commit('SetDialog', {
        content: '會員憑證過期，請重新登入',
        status: true,
      });
    }
  }
  return Promise.reject(error);
};

const getCookie = (name) => {
  return getLocalStorage(name);
};

// const showDialog = (res) => {
//   store.commit('SetDialog', {
//     title: '發生錯誤',
//     content: res,
//     status: true,
//   });
// };

// const showSnackBar = (text) => {
//   store.commit('SetSnackbar', {
//     content: text,
//     status: true,
//   });
// };

// request攔截器
service.interceptors.request.use(
  (config) => {
    const token = getCookie('account_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
// respone攔截器
service.interceptors.response.use((response) => {
  // console.log("response.data", response.data);
  return response.data;
}, err);

/*
 *  get請求
 *  url:請求地址
 *  params:引數
 * */
export function get(url, params = {}) {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    // console.log("process.env.VUE_APP_BASE_API", process.env.VUE_APP_BASE_API);
    service({
      url: url,
      method: 'get',
      params: params,
    })
      .then((response) => {
        resolve(response);
        if (response.code == 302) {
          delLocalStorage('account_token');
          store.commit('SetDialog', {
            content: '會員憑證過期，請重新登入',
            status: true,
          });
        }
        store.commit('SetLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetLoading', -1);
      });
  });
}

/*
 *  post請求
 *  url:請求地址
 *  params:引數
 * */
export function post(url, params = {}) {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        if (response.code == 302) {
          delLocalStorage('account_token');
          store.commit('SetDialog', {
            content: '會員憑證過期，請重新登入',
            status: true,
          });
        }
        store.commit('SetLoading', -1);
        resolve(response);
      })
      .catch((error) => {
        store.commit('SetLoading', -1);
        reject(error);
      });
  });
}

/*
 *  put請求
 *  url:請求地址
 *  params:引數
 * */
export function put(url, params = {}) {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'put',
      data: params,
    })
      .then((response) => {
        console.log(response);
        if (response.code == 302) {
          delLocalStorage('account_token');
          store.commit('SetDialog', {
            content: '會員憑證過期，請重新登入',
            status: true,
          });
        }
        store.commit('SetLoading', -1);
        resolve(response);
      })
      .catch((error) => {
        store.commit('SetLoading', -1);
        reject(error);
      });
  });
}

/*
 *  patch請求
 *  url:請求地址
 *  params:引數
 * */
export function patch(url, params = {}) {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'patch',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.code == 302) {
          delLocalStorage('account_token');
          store.commit('SetDialog', {
            content: '會員憑證過期，請重新登入',
            status: true,
          });
        }
        store.commit('SetLoading', -1);
        resolve(response);
      })
      .catch((error) => {
        store.commit('SetLoading', -1);
        reject(error);
      });
  });
}

/*
 *  delete請求
 *  url:請求地址
 *  params:引數
 * */
export function del(url, params = {}) {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'delete',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.code == 302) {
          delLocalStorage('account_token');
          store.commit('SetDialog', {
            content: '會員憑證過期，請重新登入',
            status: true,
          });
        }
        store.commit('SetLoading', -1);
        resolve(response);
      })
      .catch((error) => {
        store.commit('SetLoading', -1);
        reject(error);
      });
  });
}

/*
 *  post_form請求
 *  url:請求地址
 *  params:引數
 * */
export function post_form(url, params = {}) {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    // console.log(service)
    // service.headers["Content-Type"] = "multipart/form-data;charset=UTF-8"
    service({
      url: url,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((response) => {
        // console.log(response)
        if (response.code == 302) {
          delLocalStorage('account_token');
          store.commit('SetDialog', {
            content: '會員憑證過期，請重新登入',
            status: true,
          });
        }
        store.commit('SetLoading', -1);
        resolve(response);
      })
      .catch((error) => {
        store.commit('SetLoading', -1);
        reject(error);
      });
  });
}

export default {
  get,
  post,
  put,
  del,
  patch,
};
