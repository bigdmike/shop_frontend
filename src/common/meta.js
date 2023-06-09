import store from '@/store/index';
import router from '@/router/index';

// 讀取後臺設定的SEO META資料
export function GetMatchMetaData(column_title) {
  let meta_data_list = store.state.common_column_data;
  let title = meta_data_list.filter(
    (item) => item.Title == `meta_title_${column_title}`
  );
  let content = meta_data_list.filter(
    (item) => item.Title == `meta_content_${column_title}`
  );
  let image = meta_data_list.filter(
    (item) => item.Title == `meta_image_${column_title}`
  );

  // 若有相符的SEO META資料則將資料返回
  if (title.length > 0) {
    return {
      title: title[0].Content,
      content: content[0].Content.replaceAll(/<[^>]+>/g, ''),
      image: GetImageUrl(image[0].Content),
    };
  } else {
    return false;
  }
}

// 讀取網站基本SEO META資料
export function GetBaseMetaData() {
  let meta_data_list = store.state.common_column_data;
  let base_title = meta_data_list.filter(
    (item) => item.Title == 'meta_title_home'
  )[0];
  let base_content = meta_data_list.filter(
    (item) => item.Title == 'meta_content_home'
  )[0];
  let base_image = meta_data_list.filter(
    (item) => item.Title == 'meta_image_home'
  )[0];
  return {
    title: base_title.Content,
    content: base_content.Content.replaceAll(/<[^>]+>/g, ''),
    image: GetImageUrl(base_image.Content),
  };
}

// 取得META DATA
export function GetMetaData(title, content, image) {
  // 讀取是否有符合的SEO META資料
  let match_meta = GetMatchMetaData(title);
  // 讀取基本SEO META資料
  let default_meta = GetBaseMetaData();

  // 沒有符合的SEO META資料，沒有帶入的資料欄位則會使用基本SEO META資料填入
  if (match_meta == false) {
    // 檢查description字數是否過長，超過155字則擷取前155字
    default_meta.content.length > 155
      ? (default_meta.content = default_meta.content.slice(0, 155) + '...')
      : '';
    return {
      title: title + ' | Krace 凱鋭斯',
      meta: [
        {
          property: 'og:url',
          name: 'og:url',
          content:
            process.env.VUE_APP_BASEURL + router.history.current.fullPath,
          vmid: 'og:url',
        },
        {
          property: 'og:title',
          name: 'og:title',
          content: title + ' | Krace 凱鋭斯',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          name: 'og:description',
          content: content == '' ? default_meta.content : content,
          vmid: 'og:description',
        },
        {
          property: 'twitter:description',
          name: 'twitter:description',
          content: content == '' ? default_meta.content : content,
          vmid: 'twitter:description',
        },
        {
          property: 'description',
          name: 'description',
          content: content == '' ? default_meta.content : content,
          vmid: 'description',
        },
        {
          property: 'og:image',
          name: 'og:image',
          content: image == '' ? default_meta.image : image,
          vmid: 'og:image',
        },
        {
          property: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: title + ' | Krace 凱鋭斯',
          vmid: 'apple-mobile-web-app-title',
        },
        {
          property: 'application-name',
          name: 'application-name',
          content: title + ' | Krace 凱鋭斯',
          vmid: 'application-name',
        },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content: '官方網站 ｜ Krace 凱鋭斯',
          vmid: 'og:site_name',
        },
        {
          property: 'og:type',
          name: 'og:type',
          content: 'website',
          vmid: 'og:type',
        },
        {
          property: 'og:locale',
          name: 'og:locale',
          content: 'zh_tw',
          vmid: 'og:locale',
        },
      ],
    };
  }
  // 有找到符合的SEO META資料
  else {
    // 檢查description字數是否過長，超過155字則擷取前155字
    match_meta.content.length > 155
      ? (match_meta.content = match_meta.content.slice(0, 155) + '...')
      : '';
    return {
      title: match_meta.title + ' ｜ Krace 凱鋭斯',
      meta: [
        {
          property: 'og:url',
          name: 'og:url',
          content:
            process.env.VUE_APP_BASEURL + router.history.current.fullPath,
          vmid: 'og:url',
        },
        {
          property: 'og:title',
          name: 'og:title',
          content: match_meta.title + ' ｜ Krace 凱鋭斯',
          vmid: 'og:title',
        },
        {
          property: 'og:description',
          name: 'og:description',
          content: match_meta.content,
          vmid: 'og:description',
        },
        {
          property: 'twitter:description',
          name: 'twitter:description',
          content: match_meta.content,
          vmid: 'twitter:description',
        },
        {
          property: 'description',
          name: 'description',
          content: match_meta.content,
          vmid: 'description',
        },
        {
          property: 'og:image',
          name: 'og:image',
          content: match_meta.image,
          vmid: 'og:image',
        },
        {
          property: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: match_meta.title + ' ｜ Krace 凱鋭斯',
          vmid: 'apple-mobile-web-app-title',
        },
        {
          property: 'application-name',
          name: 'application-name',
          content: match_meta.title + ' ｜ Krace 凱鋭斯',
          vmid: 'application-name',
        },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content: '官方網站 ｜ Krace 凱鋭斯',
          vmid: 'og:site_name',
        },
        {
          property: 'og:type',
          name: 'og:type',
          content: 'website',
          vmid: 'og:type',
        },
        {
          property: 'og:locale',
          name: 'og:locale',
          content: 'zh_tw',
          vmid: 'og:locale',
        },
      ],
    };
  }
}

// 更換頁面標題
export function ChangeTitle(meta_data, title) {
  meta_data.title = title + ' | Krace 凱鋭斯';
  meta_data.meta[1].content = title + ' | Krace 凱鋭斯';
  meta_data.meta[6].content = title + ' | Krace 凱鋭斯';
  meta_data.meta[7].content = title + ' | Krace 凱鋭斯';
  return meta_data;
}

// 依照設定檔在圖片URL前加上API DOMAIN
function GetImageUrl(item) {
  return item == '' ? '' : process.env.VUE_APP_BASE_API + item;
}
