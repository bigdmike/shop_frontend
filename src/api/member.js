import {
    del,
    put,
    post,
    get
} from '@/common/request'
import {
    delCookie,
    setCookie
} from "@/common/cookie.js"
import {
    cookieToArray,
    shopcartO2O,
    getShopCart
} from "@/api/shopcart.js"

//註冊
export function SendSignUpData(data) {
    return post("member/register", data)
}

//登入
export async function SendLoginData(data) {
    return post("member/login", data).then(login_res => {
        if (login_res.code == 200) {
            setCookie("member_token", login_res.data.Token);
            let shopcart = cookieToArray()
            return shopcartO2O(shopcart).then(() => {
                return getShopCart().then(() => {
                    return login_res
                })

            })
        } else {
            return login_res
        }
    })
}
export function LogOut() {
    delCookie("member_token")
    return true
}

// 會員資料
export function GetAccountInfo() {
    return get("member/my")
}

export function SendAccountInfo(data) {
    return post("member/my", data)
}

export function ModifyPassword(data) {
    return post("member/password", data)
}

export function ResetPassword(account) {
    return post("member/forgetPassword", {
        Account: account
    })
}

//常用收件資訊
export function CreateReceiver(data) {
    return put("member/receiver", data)
}
export function DeleteReceiver(id) {
    return del("member/receiver/" + id)
}
export function getReceiverData() {
    var receiver = get("member/receiver")
    var zipcode = get("zipcode")

    let promise_list = [receiver, zipcode]

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return (res)
                }
            }, err => console.log(err)
        )
}

// 追蹤商品
export function getFavoriteData() {
    var favorite = get("member/favorite")
    var products = get('/goods')

    let promise_list = [products, favorite]

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return (res)
                }
            }, err => console.log(err)
        )
}

export function CreateFavorite(id) {
    let data = {
        FavoriteGoodsID: id
    }
    return put("member/favorite", data)
}

export function DeleteFavorite(id) {
    return del("member/favorite/" + id)
}

//訂單查詢
export function GetOrderList() {
    let payment = get("payment")
    let ship = get("shipping")
    let member = get("member/trade")
    let products = get('/goods')
    let promise_list = [payment, ship, member, products]


    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return res
                }
            }, err => console.log(err)
        )
}

function GetPromise(promiseList) {
    return promiseList.map(promise =>
        promise.then((res) => res)
    )

}

//訂單重新付款
export function GetRePay(trade_id) {
    return get("member/trade/payment/" + trade_id)
}