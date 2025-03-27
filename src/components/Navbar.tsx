import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, Search, User, HelpCircle } from "lucide-react";
import { Input } from "./ui/input";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { toast } from "./ui/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.addEventListener("keydown", down);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Finding results for "${searchQuery}"`,
      });

      // Navigate to auctions page with search query
      navigate(`/auctions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const performSearch = (value: string) => {
    setIsSearchOpen(false);
    if (value) {
      navigate(`/auctions?search=${encodeURIComponent(value)}`);
      toast({
        title: "Search results",
        description: `Showing results for "${value}"`,
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-subtle py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="font-sans text-2xl font-medium text-gallery-text tracking-tight"
        >
          ArtAuction
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`nav-link ${
              location.pathname === "/"
                ? "text-gallery-accent after:w-full"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/auctions"
            className={`nav-link ${
              location.pathname === "/auctions"
                ? "text-gallery-accent after:w-full"
                : ""
            }`}
          >
            Auctions
          </Link>
          <Link
            to="/artists"
            className={`nav-link ${
              location.pathname === "/artists" ||
              location.pathname.startsWith("/artist/")
                ? "text-gallery-accent after:w-full"
                : ""
            }`}
          >
            Artists
          </Link>
          <Link
            to="/about"
            className={`nav-link ${
              location.pathname === "/about"
                ? "text-gallery-accent after:w-full"
                : ""
            }`}
          >
            About
          </Link>
        </nav>

        {/* Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative"></div>

          <Link
            to="/faqs"
            className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
            aria-label="FAQs"
          >
            <HelpCircle size={20} className="text-gallery-text" />
          </Link>

          <Link
            to="/profile"
            className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
            aria-label="Profile"
          >
            <User size={20} className="text-gallery-text" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-gallery-text" />
          </button>

          <Link
            to="/faqs"
            className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
            aria-label="FAQs"
          >
            <HelpCircle size={20} className="text-gallery-text" />
          </Link>

          <Link
            to="/profile"
            className="p-2 rounded-full hover:bg-gallery-beige/50 transition-colors"
            aria-label="Profile"
          >
            <User size={20} className="text-gallery-text" />
          </Link>

          <button
            className="text-gallery-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto px-4 py-20">
          <form onSubmit={handleSearch} className="relative mb-8">
            <Input
              type="search"
              placeholder="Search artworks..."
              className="w-full pr-8 text-sm focus-visible:ring-gallery-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gallery-text/70 hover:text-gallery-accent"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>

          <nav className="flex flex-col space-y-6">
            <Link
              to="/"
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Home <ChevronRight size={18} />
            </Link>
            <Link
              to="/auctions"
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Auctions <ChevronRight size={18} />
            </Link>
            <Link
              to="/artists"
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Artists <ChevronRight size={18} />
            </Link>
            <Link
              to="/about"
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              About <ChevronRight size={18} />
            </Link>
            <Link
              to="/faqs"
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              FAQs <ChevronRight size={18} />
            </Link>
            <Link
              to="/profile"
              className="flex justify-between items-center text-xl font-medium py-2 border-b border-gallery-border"
            >
              Profile <ChevronRight size={18} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
