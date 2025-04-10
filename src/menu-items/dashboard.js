// assets
import { DashboardOutlined, BookOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  BookOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'collapse-ads',
      title: 'Annonces',
      type: 'collapse',
      children: [
        {
          id: 'ads-data-analytics',
          title: 'Analyse',
          type: 'item',
          url: 'dashboard/annonces/analyse-annonce',
          icon: icons.DashboardOutlined,
          breadcrumbs: false
        },
        {
          id: 'ads-interactive-map',
          title: 'Carte intéractive',
          type: 'item',
          url: 'dashboard/annonces/carte-interactive',
          icon: icons.BookOutlined,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'collapse-knowledge',
      title: 'Expertise locale',
      type: 'collapse',
      children: [
        {
          id: 'customer-knowledge',
          title: 'Connaissance client',
          type: 'item',
          url: 'dashboard/expertise-locale/connaissance-clients',
          icon: icons.DashboardOutlined,
          breadcrumbs: false
        },
        {
          id: 'houses-knowledge',
          title: 'Connaissance biens',
          type: 'item',
          url: 'dashboard/expertise-locale/connaissance-biens',
          icon: icons.DashboardOutlined,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default dashboard;
