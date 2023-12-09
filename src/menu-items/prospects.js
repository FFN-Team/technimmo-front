// assets
import { AreaChartOutlined,TeamOutlined,SearchOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined,
  TeamOutlined,
  SearchOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const prospects = {
  id: 'prospects',
  title: 'Prospects',
  type: 'group',
  children: [
    {
      id: 'prospect-dashboard',
      title: 'Prospects dashboard',
      type: 'item',
      url: '/',
      icon: icons.AreaChartOutlined,
    },
    {
      id: 'search-prospect',
      title: 'Search prospect',
      type: 'item',
      url: '/',
      icon: icons.SearchOutlined,
    },
    {
      id: 'buyers',
      title: 'Buyers',
      type: 'item',
      url: '/',
      icon: icons.TeamOutlined,
    }
  ]
};

export default prospects;
