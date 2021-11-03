import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'browser-outline',
    link: '/admin/admin',
    home: true,
  },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/admin/iot-dashboard',
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Profile',
    icon: 'person-outline',
    children: [
      {
        title: 'Edit Profile',
        link: '/admin/profile/edit-profile',
      },
      {
        title: 'Change Password',
        link: '/admin/profile/change-pass',
      },

    ],
  },
  {
    title: 'Requests',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Booked Orders',
        link: '/admin/requests/booked-orders',
      },
      {
        title: 'Item Received for Lahore',
        link: '/admin/requests/items-received-lhr',
      },
      {
        title: 'Delivery Run Sheet',
        link: '/admin/requests/delivery-run',
      },
      {
        title: 'View Order Assignment',
        link: '/admin/requests/order-assignment',
      },
      {
        title: 'Item Received for Outstation',
        link: '/admin/requests/items-received-out',
      },
      {
        title: 'Dispatch Orders',
        link: '/admin/requests/dispatch-orders',
      },
      {
        title: 'Assigned',
        link: '/admin/requests/assigned',
      },
      {
        title: 'Delivered',
        link: '/admin/requests/delivered',
      },
      {
        title: 'Returned',
        link: '/admin/forms/datepicker',
      },
      {
        title: 'Cancelled / Not Received',
        link: '/admin/requests/returned',
      },
      {
        title: 'Pending Orders',
        link: '/admin/requests/pending-orders',
      },
    ],
  },
  {
    title: 'Pending Customers',
    icon: 'person-outline',
    link: '/admin/ui-features',
    // children: [
    //   {
    //     title: 'Grid',
    //     link: '/admin/ui-features/grid',
    //   },
    //   {
    //     title: 'Icons',
    //     link: '/admin/ui-features/icons',
    //   },
    //   {
    //     title: 'Typography',
    //     link: '/admin/ui-features/typography',
    //   },
    //   {
    //     title: 'Animated Searches',
    //     link: '/admin/ui-features/search-fields',
    //   },
    // ],
  },
  {
    title: 'Active Customers',
    icon: 'person-outline',
    link: '/admin/active-customers'
    // children: [
    //   {
    //     title: 'Dialog',
    //     link: '/admin/modal-overlays/dialog',
    //   },
    //   {
    //     title: 'Window',
    //     link: '/admin/modal-overlays/window',
    //   },
    //   {
    //     title: 'Popover',
    //     link: '/admin/modal-overlays/popover',
    //   },
    //   {
    //     title: 'Toastr',
    //     link: '/admin/modal-overlays/toastr',
    //   },
    //   {
    //     title: 'Tooltip',
    //     link: '/admin/modal-overlays/tooltip',
    //   },
    // ],
  },
  {
    title: 'Customer Payments',
    icon: 'people-outline',
    link: '/admin/customer-payments'
    // children: [
    //   {
    //     title: 'Calendar',
    //     link: '/admin/extra-components/calendar',
    //   },
    //   {
    //     title: 'Progress Bar',
    //     link: '/admin/extra-components/progress-bar',
    //   },
    //   {
    //     title: 'Spinner',
    //     link: '/admin/extra-components/spinner',
    //   },
    //   {
    //     title: 'Alert',
    //     link: '/admin/extra-components/alert',
    //   },
    //   {
    //     title: 'Calendar Kit',
    //     link: '/admin/extra-components/calendar-kit',
    //   },
    //   {
    //     title: 'Chat',
    //     link: '/admin/extra-components/chat',
    //   },
    // ],
  },
  {
    title: 'Order Report',
    icon: 'file-outline',
    link: '/admin/order-report'
    // children: [
    //   {
    //     title: 'Google Maps',
    //     link: '/admin/maps/gmaps',
    //   },
    //   {
    //     title: 'Leaflet Maps',
    //     link: '/admin/maps/leaflet',
    //   },
    //   {
    //     title: 'Bubble Maps',
    //     link: '/admin/maps/bubble',
    //   },
    //   {
    //     title: 'Search Maps',
    //     link: '/admin/maps/searchmap',
    //   },
    // ],
  },
  {
    title: 'Shipment Report',
    icon: 'file-outline',
    link: '/admin/shipment-report'
    // children: [
    //   {
    //     title: 'Echarts',
    //     link: '/admin/charts/echarts',
    //   },
    //   {
    //     title: 'Charts.js',
    //     link: '/admin/charts/chartjs',
    //   },
    //   {
    //     title: 'D3',
    //     link: '/admin/charts/d3',
    //   },
    // ],
  },
  {
    title: 'Couriers',
    icon: 'people-outline',
    link: '/admin/couriers/list'
  },
  {
    title: 'Cities',
    icon: 'pin-outline',
    link:'/admin/cities/list'
  }

 ,
  {
    title: 'Pricing',
    icon: 'pricetags-outline',
    link:'/admin/pricing'
    // children: [
    //   {
    //     title: '404',
    //     link: '/admin/miscellaneous/404',
    //   },
    // ],
  },
  {
    title: 'Setting',
    icon: 'settings-2-outline',
    link:'/admin/setting'

    // children: [
    //   {
    //     title: 'Login',
    //     link: '/auth/login',
    //   },
    //   {
    //     title: 'Register',
    //     link: '/auth/register',
    //   },
    //   {
    //     title: 'Request Password',
    //     link: '/auth/request-password',
    //   },
    //   {
    //     title: 'Reset Password',
    //     link: '/auth/reset-password',
    //   },
    // ],
  },
];
