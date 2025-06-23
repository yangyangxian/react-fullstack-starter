import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { ROUTE_MAPPINGS } from './routeConfig';

const pageModules = import.meta.glob('../pages/**/*.tsx', { eager: true });

export function getDynamicRoutes(): RouteObject[] {
  const flatRoutes = getPageRoutes();
  const mappedRoutes = applyRouteMappings(flatRoutes);
  return buildNestedRoutes(mappedRoutes);
}

export function getPageRoutes(): RouteObject[] {
  const routes = Object.entries(pageModules)
    .map(([file, mod]) => {
      let relPath = file.replace(/^[.][.]/, '').replace(/^\/pages\//, '').replace(/\.tsx$/, '');
      relPath = relPath
        .split('/')
        .filter(seg => !/^[\(].+[\)]$/.test(seg))
        .join('/');
      const segments = relPath.split('/');
      const last = segments[segments.length - 1].replace(/Page$/, '').toLowerCase();
      
      // Generate path based on file structure
      return {
        path: '/' + (segments.length > 1 ? segments.slice(0, -1).join('/') + '/' : '') + last,
        element: React.createElement((mod as any).default),
      };
    })
    .flat();
  return routes;
}

function applyRouteMappings(routes: RouteObject[]): RouteObject[] {
  const mappedRoutes = [...routes];
  
  // Apply configured route mappings
  Object.entries(ROUTE_MAPPINGS).forEach(([targetPath, sourcePath]) => {
    const sourceRoute = routes.find(route => route.path === sourcePath);
    if (sourceRoute) {
      mappedRoutes.push({
        path: targetPath,
        element: sourceRoute.element,
      });
    }
  });
  
  return mappedRoutes;
}

function buildNestedRoutes(flatRoutes: RouteObject[]): RouteObject[] {
  const root: any = { children: {} };
  for (const route of flatRoutes) {
    if (!route.path) continue;
    const segments = route.path.replace(/^\//, '').split('/');
    let node = root;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (!node.children[seg]) {
        node.children[seg] = { children: {} };
      }
      node = node.children[seg];
      if (i === segments.length - 1) {
        node.route = route;
      }
    }
  }
  function toRoutes(node: any, parentPath = ''): RouteObject[] {
    const routes: RouteObject[] = [];
    for (const [seg, child] of Object.entries(node.children)) {
      const fullPath = parentPath ? `${parentPath}/${seg}` : seg;
      const typedChild = child as { route?: RouteObject, children: any };
      const hasChildren = Object.keys(typedChild.children).length > 0;
      let routePath = seg === '' ? '' : seg;
      if (hasChildren && !routePath.endsWith('/*') && !routePath.startsWith(':')) {
        routePath += '/*';
      }
      if (typedChild.route) {
        routes.push({
          path: routePath,
          element: typedChild.route.element,
          children: toRoutes(typedChild, fullPath),
        });
      } else {
        routes.push({
          path: routePath,
          children: toRoutes(typedChild, fullPath),
        });
      }
    }
    return routes;
  }
  return toRoutes(root);
}
