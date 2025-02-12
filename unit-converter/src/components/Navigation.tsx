'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href: string;
  items?: { name: string; href: string }[];
}

const hasItems = (item: NavigationItem): item is NavigationItem & { items: { name: string; href: string }[] } => {
  return !!item.items;
};

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Common',
    href: '#',
    items: [
      { name: 'Length', href: '/convert/length/meters-to-feet' },
      { name: 'Weight', href: '/convert/weight/kilograms-to-pounds' },
      { name: 'Temperature', href: '/convert/temperature/celsius-to-fahrenheit' },
      { name: 'Volume', href: '/convert/volume/liters-to-gallons' },
      { name: 'Speed', href: '/convert/speed/kph-to-mph' },
      { name: 'Time', href: '/convert/time/minutes-to-seconds' },
      { name: 'Area', href: '/convert/area/square-meters-to-square-feet' },
    ],
  },
  {
    name: 'Engineering',
    href: '#',
    items: [
      { name: 'Pressure', href: '/convert/pressure/pascal-to-bar' },
      { name: 'Torque', href: '/convert/torque/newton-meter-to-pound-foot' },
      { name: 'Force', href: '/convert/force/newton-to-dyne' },
      { name: 'Energy', href: '/convert/energy/joules-to-kilowatt-hours' },
      { name: 'Power', href: '/convert/power/watts-to-horsepower' },
    ],
  },
  {
    name: 'Electrical',
    href: '#',
    items: [
      { name: 'Voltage', href: '/convert/voltage/volt-to-millivolt' },
      { name: 'Current', href: '/convert/current/ampere-to-milliampere' },
      { name: 'Resistance', href: '/convert/resistance/ohm-to-kiloohm' },
      { name: 'Capacitance', href: '/convert/capacitance/farad-to-microfarad' },
      { name: 'Inductance', href: '/convert/inductance/henry-to-millihenry' },
    ],
  },
  {
    name: 'Computing',
    href: '#',
    items: [
      { name: 'Data Storage', href: '/convert/data-storage/megabytes-to-gigabytes' },
      { name: 'Data Transfer', href: '/convert/data-transfer/kbps-to-mbps' },
    ],
  },
  {
    name: 'Other',
    href: '#',
    items: [
      { name: 'Cooking', href: '/convert/cooking/cup-to-gram' },
      { name: 'Fuel Efficiency', href: '/convert/fuel-efficiency/mpg-to-kmpl' },
      { name: 'Density', href: '/convert/density/kg-per-cubic-meter-to-g-per-cubic-centimeter' },
      { name: 'Angle', href: '/convert/angle/degrees-to-radians' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

function DesktopNavItem({ item, pathname }: { item: NavigationItem; pathname: string }) {
  if (!hasItems(item)) {
    return (
      <Link
        href={item.href}
        className={classNames(
          'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
          pathname === item.href
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
        )}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        className={classNames(
          'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
          pathname.startsWith(item.href)
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400'
        )}
      >
        {item.name}
        <svg
          className={classNames(
            'ml-1 h-4 w-4 transition-transform duration-200',
            'group-hover:rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={classNames(
          'absolute left-0 z-10 mt-1 w-48 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          'invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0',
          'transition-all duration-200 ease-in-out'
        )}
      >
        <div className="py-1">
          {item.items.map((subItem) => (
            <Link
              key={subItem.name}
              href={subItem.href}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150"
            >
              {subItem.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link 
                    href="/" 
                    className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    UnitConverter
                  </Link>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                  {navigation.map((item) => (
                    <DesktopNavItem key={item.name} item={item} pathname={pathname} />
                  ))}
                </div>
              </div>

              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Fragment key={item.name}>
                    {hasItems(item) ? (
                      <>
                        <Disclosure.Button
                          className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                        >
                          {item.name}
                        </Disclosure.Button>
                        <div className="pl-4 space-y-1">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => close()}
                              className="block px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => close()}
                        className={classNames(
                          'block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200',
                          pathname === item.href
                            ? 'text-purple-600 dark:text-purple-400 bg-gray-50 dark:bg-gray-700'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Fragment>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 