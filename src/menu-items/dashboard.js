// assets
import { DashboardOutlined, BookOutlined, LikeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  BookOutlined,
  LikeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-ads',
  title: 'Annonces',
  type: 'group',
  children: [
    {
      id: 'ads-data-analytics',
      title: 'Analyse des annonces',
      type: 'item',
      url: '/analyse-annonce',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'ads-interactive-map',
      title: 'Carte intéractive des annonces',
      type: 'item',
      url: '/carte-interactive-annonces',
      icon: icons.BookOutlined,
      breadcrumbs: false
    },
    {
      id: 'ads-recommendation',
      title: 'Recommandation d\'annonces',
      type: 'item',
      url: '/recommandation-annonces',
      icon: icons.LikeOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
