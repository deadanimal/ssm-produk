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
    type: 'sub',
    icontype: 'fas fa-home text-primary',
    collapse: 'product',
    isCollapsed: true,
    children: [
      { path: 'dashboard-default', title: 'Dashboard', type: 'link' },
      { path: 'dashboard-product', title: 'Dashboard Product', type: 'link' },
    ]
  },
  {
    path: '/admin/product',
    title: 'Product',
    type: 'sub',
    icontype: 'fas fa-file-alt text-primary',
    collapse: 'product',
    isCollapsed: true,
    children: [
      //{ path: 'fee-management', title: 'Fee Management', type: 'link' },
      { path: 'product-management', title: 'Product Management', type: 'link' },
      { path: 'resupply', title: 'Product Resupply', type: 'link' },
      { path: 'involvement-management', title: 'Personal Involvement Management', type: 'link' },
      { path: 'foc-management', title: 'F.O.C. Acccount', type: 'link' },
      { path: 'statistics', title: 'Statistics', type: 'link' },
      {
        path: 'report', title: 'Report', type: 'sub', collapse: 'product', isCollapsed: true, children: [
          // { path: 'report-dashboard', title: 'Product Report', type: 'link' },
          { path: 'hasil-upp-summary', title: 'Hasil UPP Summary', type: 'link' },
          { path: 'hasil-upp-details', title: 'Hasil UPP Details', type: 'link' },
          { path: 'product-sp-ranking', title: 'Product SP Ranking', type: 'link' },
        ]
      },
    ],
  },
  {
    path: '/admin/cbid',
    title: 'CBID',
    type: 'sub',
    icontype: 'far fa-window-restore text-primary',
    collapse: 'cbid',
    isCollapsed: true,
    children: [
      {
        path: 'application-requests',
        title: 'CBID Application List',
        type: 'link',
      },
      //{ path: 'audit-trail', title: 'CBID Audit Trail', type: 'link' },
      { path: 'report', title: 'CBID Report', type: 'link' },
    ],
  },
  {
    path: '/admin/egov',
    title: 'eGov',
    type: 'sub',
    icontype: 'fas fa-tools text-primary',
    collapse: 'egov',
    isCollapsed: true,
    children: [
      { path: 'dashboard', title: 'Dashboard', type: 'link' },
      { path: 'task-management', title: 'Task Management', type: 'link' },
      { path: 'dropdown', title: 'eGov Dropdown', type: 'link' },
      { path: 'user-management', title: 'eGov User Management', type: 'link' },
      { path: 'report', title: 'eGov Report', type: 'link'}
    ],
  },
  {
    path: '/admin/enquiry',
    title: 'Enquiry',
    type: 'sub',
    icontype: 'fas fa-life-ring text-primary',
    collapse: 'enquiry',
    isCollapsed: true,
    children: [
      { path: 'general', title: 'General Enquiry', type: 'link' },
      { path: 'egov', title: 'eGov Enquiry', type: 'link' },
      { path: 'configuration', title: 'Configuration', type: 'link' },
      // { path: 'report', title: 'Report', type: 'link' }
    ],
  },
  {
    path: '/admin/finance',
    title: 'Finance',
    type: 'sub',
    icontype: 'fas fa-file-invoice text-primary',
    collapse: 'finance',
    isCollapsed: true,
    children: [
      {
        path: 'master-transaction-table', title: 'Master Transaction Table', type: 'sub', children: [
          { path: 'summary-report', title: 'Summary Report', type: 'link' },
          { path: 'detailed-report', title: 'Detailed Report', type: 'link' }
        ]
      },
      { path: 'refund-dropdowns', title: 'Refund Dropdowns', type: 'link' },
      { path: 'gaf-generator', title: 'GAF Generator', type: 'link' },
    ],
  },

  // {
  //   path: '/admin/report',
  //   title: 'Reporting',
  //   type: 'link',
  //   icontype: 'fas fa-chart-bar text-primary',
  // },

  {
    path: '/admin/utility',
    title: 'Utility',
    type: 'sub',
    icontype: 'fas fa-tools text-primary',
    collapse: 'utility',
    isCollapsed: true,
    children: [
      { path: 'user-database', title: 'Manage User Database', type: 'link' },
      { path: 'rbac', title: 'RBAC', type: 'link' },
      { path: 'audit-trail', title: 'Audit Trail', type: 'link' },
    ],
  },
  // {
  //   path: '/admin/super-admin',
  //   title: 'Super Admin',
  //   type: 'sub',
  //   icontype: 'fas fa-user-shield text-primary',
  //   collapse: 'super-admin',
  //   isCollapsed: true,
  //   children: [{ path: 'approval', title: 'Approval', type: 'link' }],
  // },
  /*
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
  }
  */
];

export const ROUTESUSER: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-warning',
  },
  {
    path: '/applications',
    title: 'Applications',
    type: 'link',
    icontype: 'fas fa-file-invoice text-pink',
  },
  {
    path: '/houses',
    title: 'Houses',
    type: 'link',
    icontype: 'fas fa-home text-purple',
  },
  {
    path: '/management',
    title: 'Management',
    type: 'link',
    icontype: 'fas fa-tasks text-red',
  },
  {
    path: '/report',
    title: 'Report',
    type: 'link',
    icontype: 'fas fa-chart-bar text-green',
  },
  {
    path: '/helpdesk',
    title: 'Helpdesk',
    type: 'link',
    icontype: 'fas fa-life-ring text-blue',
  },
  {
    path: '/audit',
    title: 'Audit Trail',
    type: 'link',
    icontype: 'fas fa-braille text-indigo',
  } /*,
  {
    path: '/maintenance',
    title: 'Maintenance',
    type: 'link',
    icontype: 'fas fa-cogs text-orange'
  }*/,
  /*{
    path: '/settings',
    title: 'Settings',
    type: 'link',
    icontype: 'fas fa-sliders-h text-blue'
  }*/
];
// SB edit