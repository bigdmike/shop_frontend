import store from "@/store/index.js"
import {
    getCookie,
    // setCookie,
    getLocalStorage,
    setLocalStorage,
    delLocalStorage
} from "@/common/cookie.js"

import {
    get,
    put,
    del,
    post
} from "@/common/request.js"

export function getPayAndShip() {
    let payment = get("payment")
    let ship = get("shipping")
    let promise_list = [payment, ship]


    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return res
                }
            }, err => console.log(err)
        )
}

export function addShopCart(id, color, size, amount) {
    //Online
    if (getCookie("member_token")) {
        return onlineAddCart(id, color, size, amount)
    }
    //Offline
    else {
        return offlineAddCart(id, color, size, amount)
    }
}

export function offlineAddCart(id, color, size, amount) {
    let shopcart = cookieToArray()
    let if_exist = false
    shopcart.forEach(item => {
        if (item.product_id == id && item.color_id == color && item.size_id == size) {
            item.amount = parseInt(item.amount) + parseInt(amount)
            if_exist = true
        }
    })
    if (!if_exist) {
        shopcart.push({
            product_id: id,
            color_id: color,
            size_id: size,
            amount: amount
        })
    }
    setLocalStorage("shopcart", arrayToCookie(shopcart))
    return new Promise(resolve => {
        resolve(true)
    })
}

export function onlineAddCart(id, color, size, amount) {
    let promise_list = []
    let product = {
        GoodsID: id,
        ColorID: color,
        SizeID: size
    }
    for (let i = 0; i < amount; i++) {
        promise_list.push(put("member/shoppingCart", product))
    }

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return true
                }
            }, err => console.log(err)
        )
}

export function removeShopCart(id, color, size, amount) {
    //Online
    if (getCookie("member_token")) {
        return onlineDeleteCart(id, color, size, amount)
    }
    //Offline
    else {
        return offlineDeleteCart(id, color, size, amount)
    }
}

export function offlineDeleteCart(id, color, size, amount) {
    let shopcart = cookieToArray()
    shopcart.forEach((item, item_index) => {
        if (item.product_id == id && item.color_id == color && item.size_id == size) {
            item.amount = parseInt(item.amount) - parseInt(amount)

            if (item.amount <= 0) {
                shopcart.splice(item_index, 1)
            }
        }
    })
    setLocalStorage("shopcart", arrayToCookie(shopcart))
    return new Promise(reslove => {
        reslove(true)
    })
}

export function onlineDeleteCart(id) {
    return del("member/shoppingCart/" + id)
}

export function getShopCart() {
    if (getCookie("member_token")) {
        return get("member/shoppingCart").then(res => {
            return covertFullShopCart(shopCartCovert(res.data)).then(shopcart => {
                store.commit("SetShopCart", shopcart)
                return shopcart
            })
        })

    } else {
        let shopcart = covertFullShopCart(cookieToArray())
        return shopcart
    }
}

export function shopcartO2O(shopcart) {
    let promise_list = []
    shopcart.forEach(item => {
        let product = {
            GoodsID: item.product_id,
            ColorID: item.color_id,
            SizeID: item.size_id
        }
        for (let i = 0; i < item.amount; i++) {
            promise_list.push(put("member/shoppingCart", product))
        }
    })


    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    delLocalStorage("shopcart")
                    return true
                }
            }, err => console.log(err)
        )
}


// cahiser
export function getCashier(coupon = "", payment = 0, shipping = 0, shopcart) {
    let data = {
        "CouponCode": coupon,
        "PaymentID": payment,
        "ShippingID": shipping,
        "ShoppingCart": []
    }
    shopcart.forEach(item => {
        for (let i = 0; i < item.amount; i++) {
            data.ShoppingCart.push({
                GoodsID: item.product_id,
                ColorID: item.color_id,
                SizeID: item.size_id
            })
        }
    })
    if (getCookie("member_token")) {
        return post("member/cashier", data)
    } else {
        return post("nonMember/cashier", data)
    }
}

// checkout
export function sendCheckout(user_data, shopcart) {
    let data = {
        "ReceiverName": user_data.receiver_info.name,
        "ReceiverPhone": user_data.receiver_info.phone,
        "ReceiverEmail": user_data.receiver_info.email,
        "ReceiverAddressCode": user_data.receiver_info.zip_code,
        "ReceiverAddress": user_data.receiver_info.address,
        "ReceiverStoreNo": user_data.shop.id,
        "ReceiverStoreInfo": user_data.shop.name,
        "ReceiverMemo": user_data.order_comment,
        "CouponCode": user_data.coupon,
        "PaymentID": user_data.payway,
        "ShippingID": user_data.shipway,
        "ShoppingCart": []
    }
    shopcart.forEach(item => {
        for (let i = 0; i < item.amount; i++) {
            data.ShoppingCart.push({
                GoodsID: item.product_id,
                ColorID: item.color_id,
                SizeID: item.size_id
            })
        }
    })
    if (getCookie("member_token")) {
        return post("member/checkout", data)
    } else {
        return post("nonMember/checkout", data)
    }

}

export function covertFullShopCart(shopcart) {
    return get('/goods').then(res => {
        let products = res.data
        shopcart.forEach(item => {
            item.product_data = products.filter(product => product.GoodsID == item.product_id)[0]
        })
        store.commit("SetShopCart", shopcart)
        return shopcart
    })
}

function shopCartCovert(shopcart) {
    let tmp_shopcart = []
    shopcart.forEach(item => {
        let if_exist = false
        tmp_shopcart.forEach(product => {
            if (product.product_id == item.GoodsID && product.color_id == item.ColorID && product.size_id == item.SizeID) {
                if_exist = true
                product.amount += 1
            }
        })
        if (!if_exist) {
            tmp_shopcart.push({
                id: item.ShoppingCartID,
                product_id: item.GoodsID,
                color_id: item.ColorID,
                size_id: item.SizeID,
                amount: 1
            })
        }
    })
    return tmp_shopcart
}

export function cookieToArray() {
    let shopcart = "";
    if (getLocalStorage("shopcart")) {
        shopcart = getLocalStorage("shopcart")
    }

    let shopcart_array = []

    shopcart.split(";").forEach(item => {
        if (item != "") {
            let tmp_product = {
                product_id: item.split(",")[0],
                color_id: item.split(",")[1],
                size_id: item.split(",")[2],
                amount: item.split(",")[3]
            }
            shopcart_array.push(tmp_product)
        }
    })

    return shopcart_array;
}

function arrayToCookie(shopcart) {
    let shopcart_string = ""

    shopcart.forEach(item => {
        let tmp_product = `${item.product_id},${item.color_id},${item.size_id},${item.amount}`
        shopcart_string += tmp_product + ";"
    })

    return shopcart_string;
}

function GetPromise(promiseList) {
    return promiseList.map(promise =>
        promise.then((res) => res)
    )
}

// shop map

export function Get711Map() {
    if (getCookie("member_token")) {
        return get("member/711Map")
    } else {
        return get("nonMember/711Map")
    }
}

export function GetFamilyMap() {
    if (getCookie("member_token")) {
        return get("member/FamilyMap")
    } else {
        return get("nonMember/FamilyMap")
    }
}