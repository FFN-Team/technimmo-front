// assets
import { AreaChartOutlined,TeamOutlined,SearchOutlined,HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined,
  TeamOutlined,
  SearchOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const properties = {
  id: 'properties-menu',
  title: 'Properties',
  type: 'group',
  children: [
    {
      id: 'search-properties',
      title: 'Search properties',
      type: 'item',
      url: '/',
      icon: icons.SearchOutlined,
    },
    {
      id: 'properties',
      title: 'Properties',
      type: 'item',
      url: '/',
      icon: icons.HomeOutlined,
    }
  ]
};

export default properties;
