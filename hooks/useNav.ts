import { detectCategoryTab, detectSortTab } from "@/const/categories";
import { useDebounceEffect } from "ahooks";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNav = () => {
  const pathname = usePathname();
  const detectedSortTab = useMemo(() => {
    return detectSortTab(pathname);
  }, [pathname]);
  const detectedCategoryTab = useMemo(() => {
    return detectCategoryTab(pathname, detectedSortTab);
  }, [pathname, detectedSortTab]);
  // const [nav, setNav] = useState<string>();
  const getNewOrderParams = (order: string, category: string) =>
    `${order}${category}`;
  const runWithNewParams = (customOrder?: string, customCategory?: string) => {
    const order = customOrder ? customOrder : detectedSortTab;
    const category = customCategory ? customCategory : detectedCategoryTab;
    const newSegment = getNewOrderParams(order, category);
    // const newPath = cleanPathname(
    //   pathname,
    //   detectedSortTab,
    //   detectedCategoryTab
    // );
    // return push(newPath + newSegment)
    // setNav(newSegment);
  };
  useDebounceEffect(
    () => {
      runWithNewParams(detectedSortTab, detectedCategoryTab);
    },
    [pathname, detectedSortTab, detectedCategoryTab],
    { wait: 1000 }
  );
  return { order: detectedSortTab, category: detectedCategoryTab };
};
