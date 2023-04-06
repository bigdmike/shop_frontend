import store from '@/store';

// 將商品資料轉換為GA電子商務事件的資料格式
export function ConvertProductData(product_data) {
  let gtm_product = {
    item_id: product_data.GoodsID, //商品ID
    item_name: product_data.Title, //商品名稱
    item_brand: GetCompanyName(), //品牌名稱
    price:
      product_data.IsCustom == 'Y'
        ? parseInt(product_data.CustomGoodsStock.SellPrice)
        : parseInt(GetLowPrice(product_data.Stock)), //客製化商品則直接帶入商品售價，一般商品則帶入庫存最低售價
    item_variant:
      product_data.IsCustom == 'Y' ? '客製化' : GetVariant(product_data.Stock), //商品選項，若為客製化商品則帶入“客製化”
    item_list_id:
      product_data.Menu.length > 0 ? product_data.Menu[0].MenuID : '', //商品目錄，帶入商品資料中第一個分類目錄ID
    index: product_data.Seq, //商品排序
    currency: 'TWD', //幣值
  };

  // 帶入商品目錄名稱，最多可帶入五個
  for (let i = 1; i <= 5; i++) {
    if (product_data.Menu.length >= i) {
      i == 1
        ? (gtm_product.item_category = product_data.Menu[i - 1].Title)
        : (gtm_product[`item_category${i}`] = product_data.Menu[i - 1].Title);
    }
  }
  return gtm_product;
}

// GA電子商務事件的加入購物車
export function ConvertAddShopCartData(
  product_data,
  active_options,
  amount,
  price
) {
  let variant_text = '';
  if (product_data.IsCustom == 'N') {
    // 若為一般商品則將『商品規格』帶入選項一與選項二
    const ColorTitle = product_data.Stock.filter(
      (item) => item.ColorID == active_options[0]
    )[0].ColorTitle;
    const SizeTitle = product_data.Stock.filter(
      (item) => item.SizeID == active_options[1]
    )[0].SizeTitle;
    variant_text = `${ColorTitle},${SizeTitle}`;
  } else {
    // 若為客製化商品則將『商品規格』全數帶入
    active_options.forEach((option, option_index) => {
      option_index != 0 ? (variant_text += ',') : '';
      product_data.CustomSpecList.forEach((item) => {
        item.CustomSpecID == option ? (variant_text += item.SpecTitle) : '';
      });
    });
  }

  let gtm_product = {
    item_id: product_data.GoodsID, //商品ID
    item_name: product_data.Title, //商品名稱
    quantity: amount, //數量
    item_brand: GetCompanyName(), //品牌名稱
    price: parseInt(price), //價錢
    item_variant: variant_text, //商品規格
    item_list_id:
      product_data.Menu.length > 0 ? product_data.Menu[0].MenuID : '', //商品目錄ID
    index: product_data.Seq, //商品排序
    currency: 'TWD', //幣值
  };

  // 帶入商品目錄名稱，最多可帶入五個
  for (let i = 1; i <= 5; i++) {
    if (product_data.Menu.length >= i) {
      i == 1
        ? (gtm_product.item_category = product_data.Menu[i - 1].Title)
        : (gtm_product[`item_category${i}`] = product_data.Menu[i - 1].Title);
    }
  }
  return gtm_product;
}

// 取得商品品牌名稱
export function GetCompanyName() {
  const column = store.state.common_column_data.filter(
    (column) => column.Title == 'brand_name'
  );
  return column.length <= 0 ? '' : column[0].Content;
}

// 篩選最低價錢的庫存金額
export function GetLowPrice(stocks) {
  let price = 9999;
  stocks.forEach((item) => {
    parseInt(item.SellPrice) < price ? (price = item.SellPrice) : '';
  });
  return price == 9999 ? 0 : price;
}

// 取得庫存選項名稱
export function GetVariant(stocks) {
  return stocks.length > 0
    ? `${stocks[0].ColorTitle},${stocks[0].SizeTitle}`
    : '';
}
