// import { Link, useLocation } from "wouter";
// import { Menu, X, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { SiYoutube, SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
// import { FaXTwitter } from "react-icons/fa6";

// const leftMenuItems = [
//   { path: "/", label: "Home" },
//   { path: "/sponsors", label: "Sponsors" },
//   { path: "/events", label: "Events" },
//   { path: "/team", label: "Team" },
// ];

// const rightMenuItems = [
//   { path: "/contact", label: "Contact Us" },
//   { path: "/gallery", label: "Gallery" },
//   { path: "/about", label: "About" },
// ];

// const socialLinks = [
//   { icon: SiYoutube, href: "https://www.youtube.com/@psitkanpur", label: "YouTube" },
//   { icon: SiInstagram, href: "https://www.instagram.com/ignitia.psitkanpur/", label: "Instagram" },
//   { icon: SiFacebook, href: "https://www.facebook.com/psitkanpur2004", label: "Facebook" },
//   { icon: SiLinkedin, href: "https://www.linkedin.com/school/psitkanpur/", label: "LinkedIn" },
//   { icon: FaXTwitter, href: "https://x.com/PSITKanpur2004", label: "Twitter" },
// ];

// export default function Navigation() {
//   const [location] = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [hidden, setHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       if (currentScrollY > 80) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setHidden(true);
//       } else {
//         setHidden(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border transition-transform duration-300 ${
//         hidden ? "-translate-y-full" : "translate-y-0"
//       } ${scrolled ? "shadow-lg" : ""}`}>
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <div className="flex items-center justify-between h-16">
//             <Link href="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
//               <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
//                 IGNITIA
//               </span>
//             </Link>

//             <div className="flex items-center gap-4">
//               <div className="hidden md:flex items-center gap-3">
//                 {socialLinks.map((social) => {
//                   const Icon = social.icon;
//                   return (
//                     <a
//                       key={social.label}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={social.label}
//                       data-testid={`link-social-${social.label.toLowerCase()}`}
//                     >
//                       <Button variant="ghost" size="icon" className="w-8 h-8">
//                         <Icon className="w-4 h-4" />
//                       </Button>
//                     </a>
//                   );
//                 })}
//               </div>

//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 data-testid="button-menu-toggle"
//                 className="relative z-50"
//               >
//                 {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {menuOpen && (
//         <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl">
//           <div className="h-full flex flex-col items-center justify-center px-4 py-20">
//             <div className="max-w-6xl w-full">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
//                 <div className="border border-primary/30 rounded-lg p-8 md:p-12 space-y-4">
//                   {leftMenuItems.map((item) => {
//                     const isActive = location === item.path;
//                     return (
//                       <Link key={item.path} href={item.path}>
//                         <button
//                           className={`w-full text-left text-xl md:text-2xl font-medium transition-all hover:text-primary hover:translate-x-2 ${
//                             isActive ? "text-primary" : "text-foreground"
//                           }`}
//                           onClick={() => setMenuOpen(false)}
//                           data-testid={`link-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
//                           style={{ fontFamily: 'Rajdhani, sans-serif' }}
//                         >
//                           {item.label}
//                         </button>
//                       </Link>
//                     );
//                   })}
//                 </div>

//                 <div className="border border-accent/30 rounded-lg p-8 md:p-12 space-y-4">
//                   {rightMenuItems.map((item) => {
//                     const isActive = location === item.path;
//                     return (
//                       <Link key={item.path} href={item.path}>
//                         <button
//                           className={`w-full text-left text-xl md:text-2xl font-medium transition-all hover:text-accent hover:translate-x-2 ${
//                             isActive ? "text-accent" : "text-foreground"
//                           }`}
//                           onClick={() => setMenuOpen(false)}
//                           data-testid={`link-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
//                           style={{ fontFamily: 'Rajdhani, sans-serif' }}
//                         >
//                           {item.label}
//                         </button>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="flex flex-col items-center gap-6">
//                 <div className="flex items-center gap-4">
//                   {socialLinks.map((social) => {
//                     const Icon = social.icon;
//                     return (
//                       <a
//                         key={social.label}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label={social.label}
//                         className="text-muted-foreground hover:text-primary transition-colors"
//                       >
//                         <Icon className="w-6 h-6" />
//                       </a>
//                     );
//                   })}
//                 </div>

//                 <button
//                   onClick={() => setMenuOpen(false)}
//                   className="px-8 py-3 border border-primary/30 rounded-lg text-sm font-medium hover:bg-primary/10 transition-all"
//                   data-testid="button-close-menu"
//                 >
//                   Close menu
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { SiYoutube, SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/sponsors", label: "Sponsors" },
  { path: "/team", label: "Team" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const socialLinks = [
  { icon: SiYoutube, href: "https://www.youtube.com/@psitkanpur", label: "YouTube" },
  { icon: SiInstagram, href: "https://www.instagram.com/ignitia.psitkanpur/", label: "Instagram" },
  { icon: SiFacebook, href: "https://www.facebook.com/psitkanpur2004", label: "Facebook" },
  { icon: SiLinkedin, href: "https://www.linkedin.com/school/psitkanpur/", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/PSITKanpur2004", label: "Twitter" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-b border-primary/20 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "shadow-[0_0_30px_rgba(139,92,246,0.2)] bg-background/95" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
              <div className="relative">
                <Sparkles className="w-6 h-6 text-primary animate-pulse absolute -top-1 -right-1" />
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  IGNITIA
                </span>
              </div>
              <span className="hidden md:inline text-sm text-muted-foreground font-medium" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                2K25
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-2xl">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <button
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                        isActive 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                      )}
                      <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
                    </button>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 mr-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-9 h-9 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </Button>
                    </a>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(!menuOpen)}
                data-testid="button-menu-toggle"
                className="relative z-50 lg:hidden w-10 h-10 hover:bg-primary/10"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl lg:hidden">
          <div className="h-full flex flex-col items-center justify-center px-4 py-24">
            <div className="max-w-md w-full space-y-2">
              {navItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <button
                      className={`w-full text-left px-6 py-4 text-xl font-medium transition-all duration-300 rounded-lg hover:bg-primary/10 hover:translate-x-2 border border-transparent hover:border-primary/30 ${
                        isActive ? "text-primary bg-primary/5 border-primary/30" : "text-foreground"
                      }`}
                      onClick={() => setMenuOpen(false)}
                      data-testid={`link-menu-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    >
                      {item.label}
                    </button>
                  </Link>
                );
              })}

              <div className="pt-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
