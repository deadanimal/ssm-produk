export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-info'
  },
  {
    path: '/admin/applications',
    title: 'Applications',
    type: 'link',
    icontype: 'fas fa-file-alt text-info'
  },
  {
    path: '/admin/rebates',
    title: 'Rebates',
    type: 'link',
    icontype: 'fas fa-file-contract text-info'
  },
  {
    path: '/admin/houses',
    title: 'Houses',
    type: 'link',
    icontype: 'fas fa-home text-info'
  },
  {
    path: '/admin/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-info'
  },
  {
    path: '/admin/report',
    title: 'Reporting',
    type: 'link',
    icontype: 'fas fa-chart-bar text-info'
  },
  {
    path: '/management',
    title: 'Management',
    type: 'sub',
    icontype: 'fas fa-tasks text-info',
    collapse: 'management',
    isCollapsed: true,
    children: [
      { path: 'users', title: 'Users', type: 'link' },
      { path: 'audit-trail', title: 'Audit Trail', type: 'link' },
    ]

  },
  /*
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning'
  },
  {
    path: '/applications',
    title: 'Applications',
    type: 'link',
    icontype: 'fas fa-file-invoice text-pink'
  },
  {
    path: '/houses',
    title: 'Houses',
    type: 'link',
    icontype: 'fas fa-home text-purple'
  },
  {
    path: '/management',
    title: 'Management',
    type: 'link',
    icontype: 'fas fa-tasks text-red'
  },
  {
    path: '/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-green'
  },
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue'
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo'
  }/*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];