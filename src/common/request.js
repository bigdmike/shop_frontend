import axios from 'axios';
// import qs from "qs";
import store from '@/store/index.js';
import router from '@/router';

let baseURL = process.env.VUE_APP_BASE_API;
// 建立axios例項
const service = axios.create({
  baseURL: baseURL,
  timeout: 600000, // 請求超時時間
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'content-type': 'application/x-www-form-urlencoded',
  },
});
const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    console.log(`message: ${data.msg}`);
    showDialog(data.msg);
    if (error.response.status == 401) {
      router.push('/login');
    }
  }
  return Promise.reject(error);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const showDialog = (res) => {
  store.commit('SetDialog', {
    title: '發生錯誤',
    content: res,
    status: true,
  });
};

const showSnackBar = (text) => {
  store.commit('SetSnackbar', {
    content: text,
    status: true,
  });
};

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
export function get(url, params = {}, success_text = '') {
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
        success_text != '' ? showSnackBar(success_text) : '';
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
export function post(url, params = {}, success_text = '') {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetLoading', -1);
      });
  });
}

/*
 *  put請求
 *  url:請求地址
 *  params:引數
 * */
export function put(url, params = {}, success_text = '') {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'put',
      data: params,
    })
      .then((response) => {
        resolve(response);
        response.code != 200 ? showDialog(response) : '';
        success_text != '' ? showSnackBar(success_text) : '';

        store.commit('SetLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetLoading', -1);
      });
  });
}

/*
 *  patch請求
 *  url:請求地址
 *  params:引數
 * */
export function patch(url, params = {}, success_text = '') {
  store.commit('SetLoading', 1);
  return new Promise((resolve, reject) => {
    // console.log(service)
    // service.headers["Content-Type"] = "multipart/form-data;charset=UTF-8"
    service({
      url: url,
      method: 'patch',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((response) => {
        resolve(response);
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetLoading', -1);
      });
  });
}

/*
 *  delete請求
 *  url:請求地址
 *  params:引數
 * */
export function del(url, params = {}, success_text = '') {
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
        resolve(response);
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetLoading', -1);
      });
  });
}

/*
 *  post_form請求
 *  url:請求地址
 *  params:引數
 * */
export function post_form(url, params = {}, success_text = '') {
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
        resolve(response);
        success_text != '' ? showSnackBar(success_text) : '';
        store.commit('SetLoading', -1);
      })
      .catch((error) => {
        reject(error);
        store.commit('SetLoading', -1);
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
