import axios from 'axios';
import store from '@/store/index.js';
import router from '@/router';
import { getLocalStorage, logoutAccount } from '@/common/cookie';

let baseURL = process.env.VUE_APP_BASE_API + '/';
// 建立axios例項
const service = axios.create({
  baseURL: baseURL,
  timeout: 600000, // 請求超時時間
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// 錯誤事件
const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    console.log(`message: ${data.msg}`);
    // 若發生權限錯誤則要求重新登入
    // 可能是沒有登入或是token過期
    if (error.response.status == 401) {
      router.push('/account/login');
      logoutAccount();
      setDialog('會員憑證過期，請重新登入');
    }
    if (error.response.status == 302) {
      logoutAccount();
      setDialog('會員憑證過期，請重新登入');
    }
  }
  return Promise.reject(error);
};
// 顯示訊息
const setDialog = (content) => {
  store.commit('SetDialog', {
    content: content,
    status: true,
  });
};

// request攔截器
service.interceptors.request.use(
  (config) => {
    // 若有登入會員，則帶入token
    const token = getLocalStorage('account_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    // 顯示Loading組件
    store.commit('SetLoading', 1);
    return config;
  },
  (error) => {
    // 錯誤事件
    console.log(error);
    Promise.reject(error);
  }
);

// respone攔截器
service.interceptors.response.use((response) => {
  // 若沒有盡到錯誤但是發生權限問題，則刪除LocalStorage中的token並要求重新登入
  if (response.data.code == 302) {
    logoutAccount();
    setDialog('會員憑證過期，請重新登入');
  }
  // 關閉Loading組件
  store.commit('SetLoading', -1);
  return response.data;
}, err);

/*
 *  get請求
 *  url:請求地址
 *  params:引數
 * */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'get',
      params: params,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/*
 *  post請求
 *  url:請求地址
 *  params:引數
 * */
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
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
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'put',
      data: params,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
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
        resolve(response);
      })
      .catch((error) => {
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
      })
      .catch((error) => {
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
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
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
