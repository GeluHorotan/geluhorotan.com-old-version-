import { FaHome } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

import useBreadcrumbs from '@/customHooks/useBreadcrumbs';

import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumb = () => {
  const [breadcrumbs] = useBreadcrumbs();

  if (
    breadcrumbs &&
    breadcrumbs.length !== 0 &&
    !breadcrumbs[0]?.href.includes('dashboard')
  )
    return (
      <nav className=" absolute my-8 w-full   px-14">
        <ol className="flex w-1/2  items-center justify-start   divide-x-4 rounded-xl  bg-secondary_t_2 ">
          <BreadcrumbItem className="   rounded-l-lg  py-2 px-4 " href="/">
            <FaHome className="text-primary " />
          </BreadcrumbItem>

          {breadcrumbs &&
            breadcrumbs.map((breadcrumb) => (
              <>
                <IoIosArrowForward />

                <BreadcrumbItem
                  className="cursor-pointer p-2  text-xs text-primary"
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                >
                  {breadcrumb.label.toUpperCase()}
                </BreadcrumbItem>
              </>
            ))}
        </ol>
      </nav>
    );
};

export default Breadcrumb;
