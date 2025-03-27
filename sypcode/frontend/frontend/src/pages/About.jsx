import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ShieldCheckIcon,
  UserGroupIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Us
            </h1>
            <p className="mt-6 text-xl">
              We're on a mission to make property renting simple, efficient, and secure for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-secondary-900 sm:text-4xl">
                Our Story
              </h2>
              <p className="mt-4 text-lg text-secondary-500">
                Founded in 2024, our real estate management platform was created to address the common frustrations faced by property owners and renters in the rental market.
              </p>
              <p className="mt-4 text-lg text-secondary-500">
                We noticed that the traditional rental process was often inefficient, with miscommunications, paperwork delays, and a lack of transparency. That's why we built a platform that simplifies and streamlines the entire rental journey.
              </p>
              <p className="mt-4 text-lg text-secondary-500">
                Today, we're proud to connect property owners with quality renters, making the rental process smooth and hassle-free for everyone involved.
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/api/placeholder/600/400"
                  alt="Team working together"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-secondary-900">
              What Sets Us Apart
            </h2>
          </div>
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center mb-4">
                  <UserGroupIcon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">User-Centric Design</h3>
                <p className="text-secondary-600">
                  Our platform is designed with users in mind, offering intuitive interfaces for both property owners and renters.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center mb-4">
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">Secure Transactions</h3>
                <p className="text-secondary-600">
                  We prioritize security in all aspects of our platform, ensuring your data and transactions are protected.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-md flex items-center justify-center mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">Transparent Process</h3>
                <p className="text-secondary-600">
                  Our booking system provides complete transparency, with clear availability calendars and instant confirmations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-secondary-900">
              Our Team
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-secondary-500 mx-auto">
              Meet the people behind our real estate management platform.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/200/200"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-xl font-medium text-secondary-900">Jane Smith</h3>
              <p className="text-primary-600">CEO & Founder</p>
              <p className="mt-2 text-secondary-500">Real estate expert with over 15 years of industry experience.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/200/200"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-6 text-xl font-medium text-secondary-900">Michael Johnson</h3>
              <p className="text-primary-600">CTO</p>
              <p className="mt-2 text-secondary-500">Tech visionary with a passion for creating seamless user experiences.</p>
            </div>
            </div>
            </div>
            </div>
            </div>
  )
}
export default About;