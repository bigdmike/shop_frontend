import { removeShopcart } from '@/api/member';
import { setLocalStorage, getLocalStorage } from '@/common/cookie';
import store from '@/store/index';

export function SaveShopCart(shopcart) {
  let tmp_list = '';

  shopcart.forEach((item, item_index) => {
    item_index != 0 ? (tmp_list += ';') : '';
    tmp_list += `${item.product_data.GoodsID},${item.active_option[0]},${item.active_option[1]},${item.amount}`;
  });

  setLocalStorage('shopcart', tmp_list);
}

export async function SaveOnlineShopCart(shopcart) {
  let tmp_list = [];
  // 不存在的商品
  let delete_list = [];

  shopcart.forEach((item) => {
    let product_exist = -1;
    let product_data = store.state.product_data.filter(
      (product) => product.GoodsID == item.GoodsID
    );
    if (product_data.length > 0) {
      product_data = product_data[0];
      // 檢查是否存在相同商品
      tmp_list.forEach((product, product_index) => {
        console.log(product);
        if (
          product.product_data.GoodsID == item.GoodsID &&
          product.active_option[0] == item.ColorID &&
          product.active_option[1] == item.SizeID
        ) {
          product_exist = product_index;
        }
      });
      if (product_exist == -1) {
        tmp_list.push({
          product_data: product_data,
          active_option: [item.ColorID, item.SizeID],
          amount: 1,
          shopcart_id: [item.ShoppingCartID],
        });
      } else {
        tmp_list[product_exist].amount += 1;
        tmp_list[product_exist].shopcart_id.push(item.ShoppingCartID);
      }
    } else {
      delete_list.push(item);
    }
  });

  tmp_list.forEach((item, item_index) => {
    const option_status = CheckActiveOption(item);
    if (option_status == 'error') {
      delete_list.push(item);
      tmp_list.splice(item_index, 1);
    }
  });

  for (let item of delete_list) {
    await removeShopcart(item.ShoppingCartID);
  }

  return tmp_list;
}

export function ReadShopCart() {
  let tmp_list = getLocalStorage('shopcart');
  let change = false;
  let shopcart = [];

  if (tmp_list) {
    tmp_list = tmp_list.split(';');
    tmp_list.forEach((item) => {
      const shopcart_item = item.split(',');
      const product_data = store.state.product_data.filter(
        (item) => item.GoodsID == shopcart_item[0]
      );
      if (product_data.length > 0) {
        shopcart.push({
          product_data: product_data[0],
          active_option: [shopcart_item[1], shopcart_item[2]],
          amount: shopcart_item[3],
        });
      } else {
        change = true;
      }
    });
    if (change) {
      SaveShopCart(shopcart);
    }
    return shopcart;
  } else {
    return [];
  }
}

export function CheckActiveOption(shopcart_item) {
  const stock = shopcart_item.product_data.Stock.filter((item) => {
    return (
      item.ColorID == shopcart_item.active_option[0] &&
      item.SizeID == shopcart_item.active_option[1]
    );
  });
  return stock.length > 0 ? stock[0] : 'error';
}
