<?php header('Content-type: application/xml; charset=utf-8')?>
<?php
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:g="http://base.google.com/ns/1.0">';
echo '<title>Yaowen - Online Store</title>';
echo '<link rel="self" href="http://www.yaowenfruit.com"/>';
echo '<updated>20011-07-11T12:00:00Z</updated>'; ?>

<?php
// 商品
$product_data = file_get_contents('https://api.yaowenfruit.com/goods');
$product_data = json_decode($product_data, true)["data"];
?>

<?php
foreach ($product_data as $index => $product) {
    // echo $product["Memo1"];
// <!-- First example shows what attributes are required and recommended for items that are not in the apparel category -->
    echo '<entry>';
// <!-- The following attributes are always required -->
    echo '<g:id>yaowen_' . $product["GoodsID"] . '</g:id>';
    echo '<g:title>' . $product["Title"] . '</g:title>';
    echo '<g:description>' . strip_tags($product["Memo1"]) . '</g:description>';
    echo '<g:link>https://www.yaowenfruit.com/product/' . $product["GoodsID"] . '</g:link>';
    echo '<g:image_link>https://api.yaowenfruit.com/' . $product["Image1"] . '</g:image_link>';
    echo '<g:condition>new</g:condition>';
    echo '<g:availability>in stock</g:availability>';
    echo '<g:price>' . GetLowPrice($product["Stock"]) . ' TWD</g:price>';
    echo '<g:shipping>';
    echo '<g:country>TW</g:country>';
    echo '<g:service>Standard</g:service>';
    echo '<g:price>200 TWD</g:price>';
    echo '</g:shipping>';

// <!-- 2 of the following 3 attributes are required fot this item according to the Unique Product Identifier Rules -->
    // echo '<g:gtin>71919219405200</g:gtin>';
    echo '<g:brand>耀聞水果世界</g:brand>';
    // echo '<g:mpn></g:mpn>';

// <!-- The following attributes are not required for this item, but supplying them is recommended -->
    // echo '<g:google_product_category>Electronics > Video > Televisions > Flat Panel Televisions</g:google_product_category>';
    // echo '<g:product_type>Consumer Electronics &gt; TVs &gt; Flat Panel TVs</g:product_type>';
    echo '</entry>';
}
?>
<?php echo '</feed>'; ?>

<?php
function GetLowPrice($stocks)
{
    $price = 999999;
    foreach ($stocks as $index => $stock) {
        // print_r(intval($stock["SellPrice"]));
        // print_r("<br>");
        intval($stock["SellPrice"]) < $price ? $price = intval($stock["SellPrice"]) : "";
    }
    return $price == 999999 ? 0 : $price;
}
?>
