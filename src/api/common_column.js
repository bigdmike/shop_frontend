import {
    get,
    post
} from '@/common/request'



export function getColumnData() {
    return get('/column');
}

export function getZipCode() {
    return get("zipcode")
}

export function sendContact({
    name,
    email,
    phone,
    content
}) {
    let data = {
        Name: name,
        Email: email,
        Phone: phone,
        Comment: content
    }
    return post("contactUs", data)
}

export function getOrder({
    trade_id,
    phone
}) {
    let data = {
        TradeID: trade_id,
        ReceiverPhone: phone
    }

    let payment = get("payment")
    let ship = get("shipping")
    let order = post("nonMember/trade", data)
    let products = get('/goods')
    var zipcode = get("zipcode")
    let promise_list = [order, payment, ship, products, zipcode]


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