/* eslint-disable no-unused-vars */
export enum PageType {
  User,
  Veil,
  Group,
  NotFound,
}

export const apiRouteInfo = (path: string): PageType => {
  const unique = path.substring(1, path.length);

  if (unique === 'someuser') {
    return PageType.User;
  }

  if (unique === 'someveil') {
    return PageType.Veil;
  }

  if (unique === 'somegroup') {
    return PageType.Group;
  }

  return PageType.NotFound;
};
