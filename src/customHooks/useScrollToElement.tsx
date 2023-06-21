import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { UrlObject } from 'url';

const useScrollToElement = () => {
  const router = useRouter();

  const scrollToElement = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const handleContactClick = (
    event: { preventDefault: () => void },
    to: string | UrlObject,
    target: string,
    offset = 0
  ) => {
    event.preventDefault();

    const handleRouteChangeComplete = () => {
      scrollToElement(target, offset);
    };

    if (router.pathname === to) {
      scrollToElement(target, offset);
    } else {
      router.push(to).then(handleRouteChangeComplete);
    }
  };

  const extractTargetFromUrl = (
    url: string | string[][] | Record<string, string> | URLSearchParams
  ) => {
    const searchParams = new URLSearchParams(url);
    return searchParams.get('target');
  };

  useEffect(() => {
    const handleRouteChangeComplete = (url: any) => {
      const target = extractTargetFromUrl(url);
      const elementId = target || ''; // ID of the target element, or empty string for scrolling to the top
      if (elementId) {
        scrollToElement(elementId);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []); // Make sure to adjust the dependency array if needed

  return handleContactClick;
};

export default useScrollToElement;
