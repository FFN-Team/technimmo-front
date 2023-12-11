// assets
import { AreaChartOutlined,TeamOutlined,SearchOutlined,HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  AreaChartOutlined,
  TeamOutlined,
  SearchOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - Properties ||============================== //

const properties = {
  id: 'properties-menu',
  title: 'Properties',
  type: 'group',
  children: [
    {
      id: 'search-properties',
      title: 'Search properties',
      type: 'item',
      url: '/search-properties',
      icon: icons.SearchOutlined,
    },
    {
      id: 'properties',
      title: 'Properties',
      type: 'item',
      url: '/properties',
      icon: icons.HomeOutlined,
    }
  ]
};

export default properties;
