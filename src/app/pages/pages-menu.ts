import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "browser-outline",
    link: "/admin/admin",
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
    title: "Profile",
    icon: "person-outline",
    children: [
      {
        title: "Edit Profile",
        link: "/admin/profile/edit-profile",
      },
      {
        title: "Change Password",
        link: "/admin/profile/change-pass",
      },
    ],
  },
  {
    title: "Requests",
    icon: "edit-2-outline",
    children: [
      {
        title: "Booked Orders",
        link: "/admin/requests/booked-orders",
      },
      {
        title: "Item Received for Lahore",
        link: "/admin/requests/items-received-lhr",
      },
      {
        title: "Delivery Run Sheet",
        link: "/admin/requests/delivery-run",
      },
      {
        title: "View Order Assignment",
        link: "/admin/requests/order-assignment",
      },
      {
        title: "Item Received for Outstation",
        link: "/admin/requests/items-received-out",
      },
      {
        title: "Dispatch Orders",
        link: "/admin/requests/dispatch-orders",
      },
    ],
  },
  {
    title: "Customers",
    icon: "person-outline",
    // link: "/admin/pnd-customers",
    children: [
      {
        title: "Pending Customers",

        link: "/admin/pnd-customers",
      },
      {
        title: "Active Customers",

        link: "/admin/active-customers",
      },
    ],
  },
  {
    title: "Active Customers",
    icon: "person-outline",
    link: "/admin/active-customers",
  },
  {
    title: "Finance Management",
    icon: "people-outline",
    link: "/admin/finance",
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
    title: "Couriers",
    icon: "people-outline",
    link: "/admin/couriers/list",
  },
  {
    title: "Add Destinations",
    icon: "pin-outline",
    // link:'/admin/cities/list'
    children: [
      {
        title: "Country",
        link: "/admin/Destinations/country-list",
      },
      {
        title: "Province",
        link: "/admin/Destinations/province-list",
      },
      {
        title: "City",
        link: "/admin/Destinations/city-list",
      },
    ],
  },

  {
    title: "Pricing",
    icon: "pricetags-outline",
    link: "/admin/pricing",
    // children: [
    //   {
    //     title: '404',
    //     link: '/admin/miscellaneous/404',
    //   },
    // ],
  },
  {
    title: "Setting",
    icon: "settings-2-outline",

    children: [
      {
        title: "General",
        link: "/admin/general-config",
      },
      {
        title: "App-Configuration",
        link: "/admin/app-config",
      },
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
    ],
  },
];
