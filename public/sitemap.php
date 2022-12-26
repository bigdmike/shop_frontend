<?php header('Content-type: application/xml; charset=utf-8')?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>' ?>
<?php
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
?>


<?php
// 商品
$product_data = file_get_contents('https://api.yaowenfruit.com/goods');
$product_data = json_decode($product_data, true)["data"];

// 商品列表
$product_list = file_get_contents('https://api.yaowenfruit.com/menu');
$product_list = json_decode($product_list, true)["data"];

// 最新消息
$news_data = file_get_contents('https://api.yaowenfruit.com/news');
$news_data = json_decode($news_data, true)["data"];

// 最新消息列表
$news_list = file_get_contents('https://api.yaowenfruit.com/news/category');
$news_list = json_decode($news_list, true)["data"];

?>


<?php
echo '<url>';
echo '<loc>https://www.yaowenfruit.com/</loc>';
echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
echo '</url>';
?>
<?php
echo '<url>';
echo '<loc>https://www.yaowenfruit.com/about</loc>';
echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
echo '</url>';
?>

<?php
echo '<url>';
echo '<loc>https://www.yaowenfruit.com/collections</loc>';
echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
echo '</url>';
foreach ($product_list as $index => $list_item) {
    echo '<url>';
    echo '<loc>https://www.yaowenfruit.com/collections?category=' . $list_item["MenuID"] . '</loc>';
    echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
    echo '</url>';
}
?>

<?php
foreach ($product_data as $index => $list_item) {
    echo '<url>';
    echo '<loc>https://www.yaowenfruit.com/product/' . $list_item["GoodsID"] . '</loc>';
    echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
    echo '</url>';
}
?>

<?php
echo '<url>';
echo '<loc>https://www.yaowenfruit.com/news</loc>';
echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
echo '</url>';
foreach ($news_list as $index => $list_item) {
    echo '<url>';
    echo '<loc>https://www.yaowenfruit.com/news?category=' . $list_item["NewsCategoryID"] . '</loc>';
    echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
    echo '</url>';
}
?>

<?php
foreach ($news_data as $index => $list_item) {
    echo '<url>';
    echo '<loc>https://www.yaowenfruit.com/news/page/' . $list_item["NewsID"] . '</loc>';
    echo '<lastmod>' . date("Y-m-d") . '</lastmod>';
    echo '</url>';
}
?>

<?php echo '</urlset>' ?>