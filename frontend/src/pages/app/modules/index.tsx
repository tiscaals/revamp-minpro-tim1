import React, { useEffect } from 'react';
import Modules from './module/modules';
import RouteActions from './routeAction/routeActions';
import BreadcrumbsSlice from '../../shared/breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import {
  reqGetModule,
  reqGetRouteAction,
} from '@/pages/redux/master-ade-schema/actions/actionReducer';

const index = () => {
  const { modules, refreshModules } = useSelector(
    (state: any) => state.ModulesReduce
  );
  const { routeActions, refreshRouteActions } = useSelector(
    (state: any) => state.routeActionsReduce
  );
  const dispatch = useDispatch();
  console.log('object', routeActions);

  useEffect(() => {
    dispatch(reqGetModule());
    dispatch(reqGetRouteAction());
  }, [refreshModules, refreshRouteActions]);

  return (
    <>
      <BreadcrumbsSlice />
      <div>
        <div className="rounded bg-blue h-auto shadow-sm py-2">
          <Modules module={modules} />
        </div>
        <div className="rounded bg-blue h-auto shadow-sm py-2">
          <RouteActions routeActions={routeActions} module={modules} />
        </div>
      </div>
    </>
  );
};

export default index;
