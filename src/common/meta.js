import store from '@/store/index';

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

export function GetMetaData(title, content, image) {
  let match_meta = GetMatchMetaData(title);
  let default_meta = GetBaseMetaData();
  if (match_meta == false) {
    return {
      title: title + ' | 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
      meta: [
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
          content: title + ' | 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
          vmid: 'apple-mobile-web-app-title',
        },
        {
          property: 'application-name',
          name: 'application-name',
          content: title + ' | 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
          vmid: 'application-name',
        },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content:
            '官方網站 ｜ 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
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
      title:
        match_meta.title +
        ' ｜ 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
      meta: [
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
          content:
            match_meta.title +
            ' ｜ 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
          vmid: 'apple-mobile-web-app-title',
        },
        {
          property: 'application-name',
          name: 'application-name',
          content:
            match_meta.title +
            ' ｜ 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
          vmid: 'application-name',
        },
        {
          property: 'og:site_name',
          name: 'og:site_name',
          content:
            '官方網站 ｜ 耀聞水果世界 - 進口水果批發商、零售、客製化禮盒',
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

function GetImageUrl(item) {
  return item == '' ? '' : process.env.VUE_APP_BASE_API + item;
}
