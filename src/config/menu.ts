import {AppRoute} from './app-route';

export const menu: Array<{
  label: string;
  key: string;
}> = [
  {
    key: AppRoute.HOME,
    label: 'Home',
  },
  {
    key: AppRoute.DEVOPS_PIPELINES,
    label: 'Devops Pipelines',
  },
];
