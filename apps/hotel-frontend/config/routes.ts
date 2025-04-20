

export default [

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'My Reservation',
    path: '/my_reservation',
    exact: false,
    hideInMenu: false,
    component: './MyReservation',
    icon: 'PieChartOutlined',
    access: 'canSeeGuest',
  },



  {
    name: 'Reservation Management',
    path: '/reservation_management',
    exact: false,
    component: './ReservationManagement',
    icon: 'UsergroupDeleteOutlined',
    // component: './Access',
    access: 'canSeeStaff',
   
  },
  {
    name: 'Login',
    layout: false,
    path: '/login',
    exact: true,
    hideInMenu: true,
    component: './Account/Login'
  },
  {
    name: 'Profile',
    path: '/profile',
    exact: true,
    hideInMenu: true,
    component: './Account/Profile'
  },

  {
    name: 'Welcome',
    path: '/welcome',
    exact: true,
    hideInMenu: true,
    component: './Welcome'
  },

]