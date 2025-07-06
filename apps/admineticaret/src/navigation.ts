export interface NavigationItemModel {
  title: string;
    icon: string;
    link: string;

}

export const navigations: NavigationItemModel[] = [
      {
        title: 'Ana Sayfa',
        icon: 'home',
        link: '/',
      },
      {
        title: 'Ürünler',
        icon: 'box',
        link: '/products',
      },
      {
        title: 'Siparişler',
        icon: 'receipt_long',
        link: '/orders',
      },
      {
        title: 'Müşteriler',
        icon: 'people',
        link: '/customers',
      },
      {
        title: 'Reports',
        icon: 'bar_chart',
        link: '/reports',
      },
    ];
 