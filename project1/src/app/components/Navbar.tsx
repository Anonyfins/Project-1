'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'CHATS', path: '/chats' },
  { name: 'PAST MOODS', path: '/past-moods' },
  { name: 'PROFILE', path: '/profile' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg rounded-lg mx-4 mt-4 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`px-4 py-2 rounded-md transition-all ${
              pathname === item.path
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm'
                : 'text-indigo-700 hover:bg-indigo-50 hover:text-purple-600'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
} 