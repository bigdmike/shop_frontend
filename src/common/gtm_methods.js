import store from '@/store';

export function ConvertProductData(product_data) {
  let gtm_product = {
    item_id: product_data.GoodsID,
    item_name: product_data.Title,
    item_brand: GetCompanyName(),
    price: parseInt(GetLowPrice(product_data.Stock)),
    item_variant: GetVariant(product_data.Stock),
    item_list_id:
      product_data.Menu.length > 0 ? product_data.Menu[0].MenuID : '',
    index: product_data.Seq,
    currency: 'TWD',
  };

  for (let i = 1; i <= 5; i++) {
    if (product_data.Menu.length >= i) {
      i == 1
        ? (gtm_product.item_category = product_data.Menu[i - 1].Title)
        : (gtm_product[`item_category${i}`] = product_data.Menu[i - 1].Title);
    }
  }
  return gtm_product;
}

export function ConvertAddShopCartData(product_data, active_options, amount) {
  const ColorTitle = product_data.Stock.filter(
    (item) => item.ColorID == active_options[0]
  )[0].ColorTitle;
  const SizeTitle = product_data.Stock.filter(
    (item) => item.SizeID == active_options[1]
  )[0].SizeTitle;
  const Price = product_data.Stock.filter(
    (item) =>
      item.SizeID == active_options[1] && item.ColorID == active_options[0]
  )[0].SellPrice;
  let gtm_product = {
    item_id: product_data.GoodsID,
    item_name: product_data.Title,
    quantity: amount,
    item_brand: GetCompanyName(),
    price: parseInt(Price),
    item_variant: `${ColorTitle},${SizeTitle}`,
    item_list_id:
      product_data.Menu.length > 0 ? product_data.Menu[0].MenuID : '',
    index: product_data.Seq,
    currency: 'TWD',
  };

  for (let i = 1; i <= 5; i++) {
    if (product_data.Menu.length >= i) {
      i == 1
        ? (gtm_product.item_category = product_data.Menu[i - 1].Title)
        : (gtm_product[`item_category${i}`] = product_data.Menu[i - 1].Title);
    }
  }
  return gtm_product;
}

export function GetCompanyName() {
  const column = store.state.common_column_data.filter(
    (column) => column.Title == 'company_name'
  );
  return column.length <= 0 ? '' : column[0].Content;
}

export function GetLowPrice(stocks) {
  let price = 9999;
  stocks.forEach((item) => {
    parseInt(item.SellPrice) < price ? (price = item.SellPrice) : '';
  });
  return price == 9999 ? 0 : price;
}

export function GetVariant(stocks) {
  return stocks.length > 0
    ? `${stocks[0].ColorTitle},${stocks[0].SizeTitle}`
    : '';
}

