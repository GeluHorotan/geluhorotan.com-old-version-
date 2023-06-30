import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
import type { UrlObject } from 'url';

const useScrollToElement = () => {
  const router = useRouter();
  const scrollToElementRef =
    useRef<(elementId: string, offset?: number) => void>();

  const scrollToElement = useCallback((elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  }, []);

  scrollToElementRef.current = scrollToElement;

  const handleContactClick = useCallback(
    (
      event: { preventDefault: () => void },
      to: string | UrlObject,
      target: string,
      offset = 0
    ) => {
      event.preventDefault();

      const handleRouteChangeComplete = () => {
        scrollToElementRef.current?.(target, offset);
      };

      if (router.pathname === to) {
        scrollToElementRef.current?.(target, offset);
      } else {
        router.push(to).then(handleRouteChangeComplete);
      }
    },
    [router]
  );

  const extractTargetFromUrl = useCallback(
    (url: string | string[][] | Record<string, string> | URLSearchParams) => {
      const searchParams = new URLSearchParams(url);
      return searchParams.get('target');
    },
    []
  );

  useEffect(() => {
    const handleRouteChangeComplete = (url: any) => {
      const target = extractTargetFromUrl(url);
      const elementId = target || ''; // ID of the target element, or empty string for scrolling to the top
      if (elementId) {
        scrollToElementRef.current?.(elementId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, extractTargetFromUrl]);

  return { handleContactClick };
};

export default useScrollToElement;
