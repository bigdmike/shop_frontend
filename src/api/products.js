import {
    get
} from '@/common/request'

export function getSingleProduct(id) {
    var menu = get('menu')
    var product = get("/goods/" + id)
    var products = get("/goods")
    if (id == "all") {
        products = get('/goods')
    }

    let promise_list = [menu, products, product]

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return (res)
                }
            }, err => console.log(err)
        )
}

export function getProductData(id) {
    var category = get("menu/category")
    var menu = get('menu')
    var products = get('goods?FilterMenuID=' + id)
    if (id == "all") {
        products = get('/goods')
    }

    let promise_list = [category, menu, products]

    return Promise.all(GetPromise(promise_list))
        .then(
            res => {
                if (promise_list.length == res.length) {
                    return (res)
                }
            }, err => console.log(err)
        )
}

function GetPromise(promiseList) {
    return promiseList.map(promise =>
        promise.then((res) => res)
    )
}