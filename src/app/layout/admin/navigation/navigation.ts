import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'testimonials',
        title: 'Testimonials',
        type: 'item',
        classes: 'nav-item',
        url: 'testimonials',
        icon: 'ti ti-typography'
      },
      {
        id: 'services',
        title: 'Services',
        type: 'item',
        classes: 'nav-item',
        url: 'services',
        icon: 'ti ti-typography'
      },
      {
        id: 'contact',
        title: 'Contact Us List',
        type: 'item',
        classes: 'nav-item',
        url: 'contact-list',
        icon: 'ti ti-device-mobile'
      },
    ]
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
