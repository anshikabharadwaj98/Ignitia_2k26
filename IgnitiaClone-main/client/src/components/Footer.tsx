import { Link } from "wouter";
import { SiYoutube, SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: SiYoutube, href: "https://www.youtube.com/@psitkanpur", label: "YouTube" },
  { icon: SiInstagram, href: "https://www.instagram.com/ignitia.psitkanpur/", label: "Instagram" },
  { icon: SiFacebook, href: "https://www.facebook.com/psitkanpur2004", label: "Facebook" },
  { icon: SiLinkedin, href: "https://www.linkedin.com/school/psitkanpur/", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/PSITKanpur2004", label: "Twitter" },
];

const quickLinks = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/sponsors", label: "Sponsors" },
  { path: "/team", label: "Team" },
  { path: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              IGNITIA 2K25
            </h3>
            <p className="text-muted-foreground mb-4">
              The ultimate techno-cultural fest of PSIT Kanpur featuring technical events, cultural showcases, and star-studded performances.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-muted-foreground hover:text-primary transition-colors" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-sm">PSIT Kanpur, Kanpur-Agra-Delhi NH-19, Bhauti, Kanpur</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <span className="text-sm">076709 98888</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <span className="text-sm">contact@ignitia.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Ignitia PSIT Kanpur. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                  data-testid={`link-footer-social-${social.label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
