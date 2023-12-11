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
      id: 'search-prospect',
      title: 'Search prospect',
      type: 'item',
      url: '/search-prospect',
      icon: icons.SearchOutlined,
    },
    {
      id: 'buyers',
      title: 'Buyers',
      type: 'item',
      url: '/buyers',
      icon: icons.TeamOutlined,
    }
  ]
};

export default prospects;
