import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    // children: [
    //   { label: "About MISTAS", path: "/about" },
    //   { label: "Mission & Vision", path: "/about#mission" },
    //   { label: "History of MIST", path: "/about#history" },
    //   { label: "Council", path: "/about#council" },
    // ],
  },
  { label: "Alumni Directory", path: "/directory" },
  { label: "Engagement", path: "/engagement" },
  { label: "Careers", path: "/careers" },
  {
    label: "News & Events",
    path: "/news",
    children: [
      { label: "News", path: "/news" },
      { label: "Events", path: "/events" },
      { label: "Archive", path: "/archive" },
    ],
  },
  {
    label: "Community",
    path: "/community",
    children: [
      { label: "Batch Groups", path: "/community/batch" },
      { label: "Department Groups", path: "/community/departments" },
      { label: "Regional Chapters", path: "/community/chapters" },
      { label: "Discussion Forum", path: "/community/forum" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      {/* Top ribbon */}
      <div className="bg-forest-900 text-forest-200 text-xs font-mono tracking-widest py-1.5 text-center hidden md:block">
        MILITARY INSTITUTE OF SCIENCE AND TECHNOLOGY — ALUMNI SOCIETY
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-forest-100"
            : "bg-white border-b border-forest-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <img
                  src="/MISTLogo2.png"
                  alt="MISTAS Logo"
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <div className="leading-none">
                <div className="font-display font-bold text-xl text-forest-900 tracking-tight">
                  MISTAS
                </div>
                <div className="font-mono text-[9px] text-forest-500 tracking-[0.2em] uppercase">
                  MIST Alumni Society
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 text-sm font-sans font-medium transition-colors duration-200 animated-underline
                      ${
                        isActive
                          ? "text-forest-700"
                          : "text-forest-800 hover:text-forest-600"
                      }`
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown size={12} className="opacity-60" />
                    )}
                  </NavLink>

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-52 bg-white shadow-xl border border-forest-100 py-2 z-50">
                      <div className="absolute top-0 left-6 w-8 h-0.5 bg-forest-600" />
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-5 py-2.5 text-sm font-sans text-forest-700 hover:text-forest-900 hover:bg-forest-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-sans font-medium text-forest-700 hover:text-forest-900 animated-underline"
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-primary text-xs py-2.5 px-5">
                Join MISTAS
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-forest-700 hover:text-forest-900"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-forest-100 bg-white">
            <nav className="max-w-7xl mx-auto px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 text-sm font-sans font-medium rounded-sm transition-colors
                      ${isActive ? "bg-forest-50 text-forest-700" : "text-forest-800 hover:bg-forest-50"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-forest-100 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block py-1.5 text-xs font-sans text-forest-600 hover:text-forest-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex gap-3">
                <Link
                  to="/login"
                  className="btn-outline text-xs py-2.5 flex-1 text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-xs py-2.5 flex-1 text-center"
                >
                  Join
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
