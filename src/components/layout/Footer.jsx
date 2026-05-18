import {
  Facebook,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Association: [
    { label: "About MISTAS", path: "/about" },
    { label: "Mission & Vision", path: "/about#mission" },
    { label: "History of MIST", path: "/about#history" },
    { label: "Constitution", path: "/about#constitution" },
    { label: "Council", path: "/about#council" },
  ],
  Alumni: [
    { label: "Alumni Directory", path: "/directory" },
    { label: "Notable Alumni", path: "/directory#notable" },
    { label: "Achievements", path: "/directory#achievements" },
    { label: "Spotlight", path: "/directory#spotlight" },
  ],
  Programs: [
    { label: "Mentorship", path: "/engagement" },
    { label: "Career Guidance", path: "/careers" },
    { label: "Job Portal", path: "/careers#jobs" },
    { label: "Events", path: "/news#events" },
    { label: "Community", path: "/community" },
  ],
  Support: [
    { label: "Contact Us", path: "/contact" },
    { label: "Help Desk", path: "/contact#help" },
    { label: "Feedback", path: "/contact#feedback" },
    { label: "Register", path: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-forest-600 rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">
                  MISTAS
                </div>
                <div className="font-mono text-[9px] text-forest-400 tracking-widest uppercase">
                  Alumni Association
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-forest-300 leading-relaxed mb-6">
              Connecting generations of MIST graduates across the globe.
              Building bridges between the past, present, and future of
              excellence.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-forest-700 flex items-center justify-center text-forest-400 hover:text-white hover:border-forest-400 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-mono text-xs tracking-widest uppercase text-forest-400 mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm font-sans text-forest-300 hover:text-white transition-colors animated-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-14 pt-8 border-t border-forest-800 flex flex-wrap gap-6">
          {[
            { Icon: MapPin, text: "Mirpur Cantonment, Dhaka-1216, Bangladesh" },
            { Icon: Mail, text: "info@mistas.edu.bd" },
            { Icon: Phone, text: "+880 2-9005576" },
          ].map(({ Icon, text }, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm font-sans text-forest-400"
            >
              <Icon size={14} className="text-forest-500" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-forest-900 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-2 text-xs font-mono text-forest-600">
          <span>
            © {new Date().getFullYear()} MISTAS — MIST Alumni Society. All
            rights reserved.
          </span>
          <div className="flex gap-5">
            <Link
              to="/privacy"
              className="hover:text-forest-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-forest-400 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
