/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/_dashboard'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const DashboardQuestionsLazyImport = createFileRoute('/_dashboard/questions')()
const DashboardGenerateLazyImport = createFileRoute('/_dashboard/generate')()
const DashboardCategoriesLazyImport = createFileRoute(
  '/_dashboard/categories',
)()
const DashboardAddQuestionLazyImport = createFileRoute(
  '/_dashboard/add-question',
)()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardQuestionsLazyRoute = DashboardQuestionsLazyImport.update({
  path: '/questions',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/questions.lazy').then((d) => d.Route),
)

const DashboardGenerateLazyRoute = DashboardGenerateLazyImport.update({
  path: '/generate',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/generate.lazy').then((d) => d.Route),
)

const DashboardCategoriesLazyRoute = DashboardCategoriesLazyImport.update({
  path: '/categories',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/categories.lazy').then((d) => d.Route),
)

const DashboardAddQuestionLazyRoute = DashboardAddQuestionLazyImport.update({
  path: '/add-question',
  getParentRoute: () => DashboardRoute,
} as any).lazy(() =>
  import('./routes/_dashboard/add-question.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard/add-question': {
      preLoaderRoute: typeof DashboardAddQuestionLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/categories': {
      preLoaderRoute: typeof DashboardCategoriesLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/generate': {
      preLoaderRoute: typeof DashboardGenerateLazyImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/questions': {
      preLoaderRoute: typeof DashboardQuestionsLazyImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  DashboardRoute.addChildren([
    DashboardAddQuestionLazyRoute,
    DashboardCategoriesLazyRoute,
    DashboardGenerateLazyRoute,
    DashboardQuestionsLazyRoute,
  ]),
])

/* prettier-ignore-end */
