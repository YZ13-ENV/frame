import { cookies } from "next/headers";

export const getVisitorId = () => {
  const cookiesList = cookies();
  const visitorIdCookie = cookiesList.get("uid");
  const visitorId = visitorIdCookie ? visitorIdCookie.value : null;
  return visitorId;
};
export const preferredOrder = () => {
  const cookiesList = cookies();
  const preferredSortingCookie = cookiesList.get("sorting");
  const preferredSorting = preferredSortingCookie
    ? preferredSortingCookie.value
    : null;
  return preferredSorting;
};
