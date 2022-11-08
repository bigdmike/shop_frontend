import store from '@/store/index';
import router from '@/router/index';

// var default_meta = {
//   title: '官方網站',
//   content:
//     '泳欣設計始終是引領你成功的品牌舵手。專業的品牌顧問團隊以品牌設計為核心，結合數位媒體行銷，打造真正屬於自我的品牌市場。',
//   image: '/img/share/index.jpg',
// };

export function GetMatchMetaData() {
  let meta_data_list = store.state.seo_meta_data;
  let base_meta_data = meta_data_list.filter((item) => item.base_meta > 0)[0];
  let match_list = [];
  let most_match = null;
  meta_data_list.forEach((item) => {
    if (
      item.base_meta == 0 &&
      router.currentRoute.path.indexOf(item.link) != -1
    ) {
      match_list.push(item);
    }
  });
  match_list.forEach((item) => {
    if (most_match == null) {
      most_match = item;
    } else if (item.link.length > most_match.link.length) {
      most_match = item;
    }
  });
  if (most_match == null) {
    return null;
  } else {
    //
    most_match.image == '' ? (most_match.image = base_meta_data.image) : '';
    most_match.description == ''
      ? (most_match.description = base_meta_data.description)
      : '';
    return most_match;
  }
}

export function GetBaseMetaData() {
  let meta_data_list = store.state.seo_meta_data;
  let base_meta_data = meta_data_list.filter((item) => item.base_meta > 0)[0];
  return base_meta_data;
}

export function GetMetaData(title, content, image) {
  let match_meta = GetMatchMetaData();
  let default_meta = GetBaseMetaData();
  if (match_meta == null) {
    title = title == '' ? default_meta.title : title;
    return {
      title: title + ' | 泳欣設計 | YongXin Design',
      meta: [
        {
          property: 'og:description',
          name: 'og:description',
          content: content == '' ? default_meta.description : content,
          vmid: 'og:description',
        },
        {
          property: 'twitter:description',
          name: 'twitter:description',
          content: content == '' ? default_meta.description : content,
          vmid: 'twitter:description',
        },
        {
          property: 'description',
          name: 'description',
          content: content == '' ? default_meta.description : content,
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
          content: title + ' | 泳欣設計 | YongXin Design',
          vmid: 'apple-mobile-web-app-title',
        },
        {
          property: 'application-name',
          name: 'application-name',
          content: title + ' | 泳欣設計 | YongXin Design',
          vmid: 'application-name',
        },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content: '官方網站 | 泳欣設計 | YongXin Design',
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
  } else {
    return {
      title: match_meta.title + ' | 泳欣設計 | YongXin Design',
      meta: [
        {
          property: 'og:description',
          name: 'og:description',
          content: match_meta.description,
          vmid: 'og:description',
        },
        {
          property: 'twitter:description',
          name: 'twitter:description',
          content: match_meta.description,
          vmid: 'twitter:description',
        },
        {
          property: 'description',
          name: 'description',
          content: match_meta.description,
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
          content: match_meta.title + ' | 泳欣設計 | YongXin Design',
          vmid: 'apple-mobile-web-app-title',
        },
        {
          property: 'application-name',
          name: 'application-name',
          content: match_meta.title + ' | 泳欣設計 | YongXin Design',
          vmid: 'application-name',
        },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content: '官方網站 | 泳欣設計 | YongXin Design',
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
