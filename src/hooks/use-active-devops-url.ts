import React from 'react';
import type {ServerUrl} from 'src/models/ServerUrl';
import {DevopsRepository} from 'src/repositories/DevopsRepository';

export function useActiveDevopsUrl(
  tab: ServerUrl | undefined,
): [string, DevopsRepository | undefined] {
  const [activeDevopsUrl, setActiveDevopsUrl] = React.useState<string>('');

  const [repository, setRepository] = React.useState<
    DevopsRepository | undefined
  >();

  React.useEffect(() => {
    if (tab) {
      setActiveDevopsUrl(tab!.url);
      setRepository(new DevopsRepository(tab.url, tab.orgName));
    }
  }, [tab]);

  return [activeDevopsUrl, repository];
}
