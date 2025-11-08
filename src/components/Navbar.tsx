'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo/Brand */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='text-xl font-semibold text-gray-900 hover:text-blue-600 transition-all duration-300 tracking-tight'
            >
              MoneyTracker
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className='hidden md:block'>
            <div className='flex items-center space-x-8'>
              <Link
                href='/'
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === '/'
                    ? 'bg-blue-500/10 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                Home
              </Link>

              {session && (
                <>
                  <Link
                    href='/user-dashboard'
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      pathname === '/user-dashboard'
                        ? 'bg-blue-500/10 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  {session.user?.userLevel === 99 && (
                    <Link
                      href='/admin-dashboard'
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        pathname === '/admin-dashboard'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* User Actions - Desktop */}
          <div className='hidden md:flex items-center space-x-4'>
            {session ? (
              <>
                <span className='text-sm text-gray-600 font-medium'>
                  {session.user?.name || session.user?.email}
                </span>
                <Button
                  type='text'
                  icon={<LogoutOutlined />}
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className='text-gray-600 hover:text-red-500 hover:bg-red-50 border-0 rounded-full transition-all duration-300'
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                href='/auth'
                className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <Button
              type='text'
              icon={<MenuOutlined />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-600 border-0 rounded-full p-2'
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className='md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'>
            <div className='px-6 py-4 space-y-3'>
              <Link
                href='/'
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  pathname === '/'
                    ? 'bg-blue-500/10 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100/50'
                }`}
              >
                Home
              </Link>

              {session && (
                <>
                  <Link
                    href='/user-dashboard'
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      pathname === '/user-dashboard'
                        ? 'bg-blue-500/10 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100/50'
                    }`}
                  >
                    Dashboard
                  </Link>
                  {session.user?.userLevel === 99 && (
                    <Link
                      href='/admin-dashboard'
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        pathname === '/admin-dashboard'
                          ? 'bg-blue-500/10 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100/50'
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                </>
              )}

              <div className='border-t border-gray-200/50 pt-3 mt-3'>
                {session ? (
                  <div className='space-y-3'>
                    <div className='px-4 py-2 text-sm text-gray-600 font-medium'>
                      {session.user?.name || session.user?.email}
                    </div>
                    <Button
                      type='text'
                      icon={<LogoutOutlined />}
                      onClick={() => {
                        signOut({ callbackUrl: '/' });
                        setIsMenuOpen(false);
                      }}
                      className='w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 border-0 rounded-xl'
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link
                    href='/auth'
                    onClick={() => setIsMenuOpen(false)}
                    className='block text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg'
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
