import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

//render - prospects
const TableBuyers = Loadable(lazy(() => import('pages/buyers')));
const Buyer = Loadable(lazy(() => import('pages/buyer')))

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'prospect-dashboard',
      element: <Color />
    },
    {
      path: 'buyers',
      children: [
        {
          path: '',
          element: <TableBuyers />,
        },
        {
          path: ':id',
          element: <Buyer />
        }
      ]
    },
    {
      path: 'properties',
      children: [
        {
          path: ':id',
          element: <Color />
        }
      ]
    },
    {
      path: 'search-prospect',
      element: <Shadow />
    },
    {
      path: 'search-properties',
      element: <Typography />
    },
    {
      path: 'properties',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
