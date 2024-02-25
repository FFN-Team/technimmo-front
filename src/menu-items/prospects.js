// assets
import { AreaChartOutlined,TeamOutlined,SearchOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined,
  TeamOutlined,
  SearchOutlined
};

// ==============================|| MENU ITEMS - Prospects ||============================== //

const prospects = {
  id: 'prospects',
  title: 'Prospects',
  type: 'group',
  children: [
    {
      id: 'prospect-dashboard',
      title: 'Prospects dashboard',
      type: 'item',
      url: '/prospect-dashboard',
      icon: icons.AreaChartOutlined,
    },
    {
      id: 'prospects',
      title: 'Prospects',
      type: 'item',
      url: '/prospects',
      icon: icons.SearchOutlined,
    },
    {
      id: 'acquereur',
      title: 'Acquéreurs',
      type: 'item', 
      url: '/acquereurs',
      icon: icons.TeamOutlined,
    }
  ]
};

export default prospects;
