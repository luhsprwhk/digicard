import { useEffect, useState, useRef } from 'react'
import { FaTerminal } from 'react-icons/fa'
import profileImg from '../assets/profile.jpg'
import clsx from 'clsx'

const Footer = ({ theme }) => {
  const [currentYear] = useState(new Date().getFullYear())
  const [cursorVisible, setCursorVisible] = useState(false)

  // Blinking cursor effect for the easter egg hint
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 800)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <footer className="text-center py-5 px-4 text-sm text-gray-500 dark:text-gray-400">
      <p>&copy; {currentYear}. All rights reserved.</p>
      <br />
      <div className="footer-details mt-2">
        {theme !== 'matrix' && (
          <span className="group relative inline-block">
            <FaTerminal
              className={
                `inline-block 
    ${theme === 'dark' ? 'glow-dark' : 'glow-light'} 
    ${cursorVisible ? 'opacity-100' : 'opacity-0'} 
    transition-all duration-300 
    hover:text-primary hover:scale-110 hover:rotate-3 cursor-pointer`
              }
            />
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded p-2 -mt-2 -translate-y-full -translate-x-1/2 left-1/2 whitespace-nowrap">
              console.log("Open sesame")
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </span>
        )}
      </div>
    </footer>
  )
}


const techBadges = [
  {
    name: 'React',
    url: 'https://react.dev/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    color: 'bg-blue-100 border-blue-400',
  },
  {
    name: 'Vite',
    url: 'https://vitejs.dev/',
    logo: 'https://vitejs.dev/logo.svg',
    color: 'bg-purple-100 border-purple-400',
  },
  {
    name: 'Tailwind',
    url: 'https://tailwindcss.com/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
    color: 'bg-cyan-100 border-cyan-400',
  },
];

const miniSitemap = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];



const SuperFooter = () => {
 
 const [currentYear] = useState(new Date().getFullYear()) 
  // Visitor Counter
  const [visits, setVisits] = useState(0);
  // Micro blog
  const [statuses, setStatuses] = useState([
    { text: '🚀 Just shipped a new feature!', date: '2025-05-18' },
    { text: '🌱 Learning about Webrings!', date: '2025-05-17' },
  ]);
  const [statusInput, setStatusInput] = useState('');
  // Guestbook
  const [shouts, setShouts] = useState([
    { name: 'Alice', msg: 'Cool site!', date: '2025-05-16' },
    { name: 'Bob', msg: 'Web 2.0 forever!', date: '2025-05-15' },
  ]);
  const [shoutName, setShoutName] = useState('');
  const [shoutMsg, setShoutMsg] = useState('');
  const lastUpdated = new Date(document.lastModified).toLocaleString();
  const statusRef = useRef(null);
  const shoutRef = useRef(null);

  // Visitor counter with localStorage
  useEffect(() => {
    let count = parseInt(localStorage.getItem('retroVisits') || '0', 10);
    count += 1;
    localStorage.setItem('retroVisits', count);
    setVisits(count);
  }, []);


  return (
    <footer className="relative bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-t border-blue-200 shadow-inner mt-8 text-xs md:text-sm text-gray-700 dark:text-gray-300 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-2 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start">
          {/* Mini Profile (Profile Pic + About Me) */}
          <div className="flex flex-col items-center md:items-start w-full mb-2">
            <img
              src={profileImg}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-web2-primaryDark shadow-md mb-1"
            />
            <div className="text-base font-bold text-web2-primaryDark dark:text-blue-400">Luh Sprwhk</div>
            <div className="text-xs text-web2-text dark:text-gray-300 text-center md:text-left max-w-[180px]">
              Web tinkerer, vaporwave enjoyer, and lover of all things retro-futurist.
            </div>
          </div>
          {/* END Mini Profile */}
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h5>Connect</h5>
          <div className="flex gap-3 items-center flex-col">
            <a href="https://luhsprwhk.beehiiv.com" target="_blank" rel="noopener noreferrer" className={clsx(
            )}>
                Beehiiv
            </a>
            <a href="https://github.com/luhsprwhk" target="_blank" rel="noopener noreferrer">
            Github
            </a>
            <a href="https://twitter.com/luhsprwhk" target="_blank" rel="noopener noreferrer">
            Twitter
            </a>
            <a href="https://youtube.com/@luhsprwhk" target="_blank" rel="noopener noreferrer">
            Youtube
            </a>
          </div>
        </div>

        {/* Sitemap, badges, webring */}
        <div className="flex flex-col gap-3 items-center md:items-center">
          <h5>Built with</h5>
          <div className="flex gap-2 items-center flex-col">
            {techBadges.map(badge => (
              <a
                key={badge.name}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 px-2 py-1 rounded border ${badge.color} shadow-sm hover:scale-110 transition-transform`}
                title={badge.name}
              >
                <img src={badge.logo} alt={badge.name} className="w-5 h-5" />
                <span className="font-bold">{badge.name}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-10">&copy; {currentYear}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export { Footer, SuperFooter }
export default Footer