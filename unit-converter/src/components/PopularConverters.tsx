'use client';

import Link from 'next/link';
import {
  ArrowsRightLeftIcon,
  BeakerIcon,
  BoltIcon,
  ClockIcon,
  CpuChipIcon,
  CubeIcon,
  ScaleIcon,
  Square3Stack3DIcon,
  RectangleGroupIcon,
  FireIcon,
  WrenchScrewdriverIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

const converters = [
  {
    name: 'Length',
    description: 'Convert between meters, feet, inches, and more',
    href: '/convert/length/meters-to-feet',
    icon: ArrowsRightLeftIcon,
  },
  {
    name: 'Weight',
    description: 'Convert between kilograms, pounds, ounces, and more',
    href: '/convert/weight/kilograms-to-pounds',
    icon: ScaleIcon,
  },
  {
    name: 'Temperature',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    href: '/convert/temperature/celsius-to-fahrenheit',
    icon: FireIcon,
  },
  {
    name: 'Volume',
    description: 'Convert between liters, gallons, cubic meters, and more',
    href: '/convert/volume/liters-to-gallons',
    icon: CubeIcon,
  },
  {
    name: 'Area',
    description: 'Convert between square meters, square feet, acres, and more',
    href: '/convert/area/square-meters-to-square-feet',
    icon: RectangleGroupIcon,
  },
  {
    name: 'Time',
    description: 'Convert between seconds, minutes, hours, and more',
    href: '/convert/time/minutes-to-seconds',
    icon: ClockIcon,
  },
  {
    name: 'Engineering',
    description: 'Convert torque, force, pressure, and more',
    href: '/convert/torque/newton-meter-to-pound-foot',
    icon: WrenchScrewdriverIcon,
  },
  {
    name: 'Electrical',
    description: 'Convert voltage, current, resistance, and more',
    href: '/convert/voltage/volt-to-millivolt',
    icon: BoltIcon,
  },
  {
    name: 'Computing',
    description: 'Convert data storage and transfer rates',
    href: '/convert/data-storage/megabytes-to-gigabytes',
    icon: CpuChipIcon,
  },
  {
    name: 'Chemistry',
    description: 'Convert density and other measurements',
    href: '/convert/density/kg-per-cubic-meter-to-g-per-cubic-centimeter',
    icon: BeakerIcon,
  },
  {
    name: 'Cooking',
    description: 'Convert between cups, grams, tablespoons, and more',
    href: '/convert/cooking/cup-to-gram',
    icon: Square3Stack3DIcon,
  },
];

export default function PopularConverters() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Popular Converters
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Choose from our most commonly used conversion tools
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {converters.map((converter) => {
              const Icon = converter.icon;
              return (
                <Link
                  key={converter.name}
                  href={converter.href}
                  className="group relative rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-500 dark:hover:border-purple-400 hover:ring-1 hover:ring-purple-500 dark:hover:ring-purple-400 bg-white dark:bg-gray-800 transition-all duration-200"
                >
                  <div>
                    <span className="inline-flex rounded-lg bg-purple-50 dark:bg-purple-900/50 p-3">
                      <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {converter.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {converter.description}
                    </p>
                  </div>
                  <ArrowTopRightOnSquareIcon 
                    className="absolute right-6 top-6 h-6 w-6 text-gray-300 dark:text-gray-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-200"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 