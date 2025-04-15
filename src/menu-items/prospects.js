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
      id: 'find-prospects',
      title: 'Rechercher des prospects',
      type: 'collapse',
      url: 'prospects/recherche',
      children: [
        {
          id: 'buyer',
          title: 'Acquéreurs',
          type: 'item', 
          url: 'prospects/acquereurs',
          icon: icons.TeamOutlined,
        }
      ]
    }
  ]
};

export default prospects;
