import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

//render - buyers
const TableBuyers = Loadable(lazy(() => import('pages/buyers')));
const Buyer = Loadable(lazy(() => import('pages/buyer')))

//render - properties
const TableProperties = Loadable(lazy(() => import('pages/properties')));
const Property = Loadable(lazy(() => import('pages/property')));

//render - notifications
const AccountSettings = Loadable(lazy(() => import('pages/accountSettings')));

//render - prospects
const SearchProspects = Loadable(lazy(() => import('pages/prospects/search-prospects')));
const Prospect = Loadable(lazy(() => import('pages/prospects/prospect')))
const FiltredProspects = Loadable(lazy(() => import('pages/prospects/filtred-prospects')));


// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
//const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));

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
      path: 'account-settings',
      element: <AccountSettings />
    },

    {
      path: 'work-in-progress',
      element: <div>Work in progress</div>
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
      path: 'prospects',
      children: [
        {
          path: '',
          element: <SearchProspects />
        },
        {
          path: 'filtre',
          children: [
            {
              path: ':filterName',
              element: <FiltredProspects />
            }        
          ]
        },
        {
          path: ':id',
          element: <Prospect />
        },   
      ]
    },

    {
      path: 'acquereurs',
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
      path: 'search-properties',
      element: <Typography />
    },

    {
      path: 'properties',
      children: [
        {
          path: '',
          element: <TableProperties />
        },
        {
          path: ':id',
          element: <Property />
        }
      ]
    },  
  ]
};

export default MainRoutes;