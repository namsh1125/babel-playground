import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const links = [
    { href: "/playground", label: "Playground" },
    { href: "/transform-process", label: "Transform Process" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white py-5 border-b border-gray-200">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="pl-8">
              <div className="flex items-center">
                <img
                  src="/img/babel.png"
                  alt="Babel Logo"
                  className="w-12 h-12"
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">Babel</h1>
                  <p className="text-sm text-gray-600">
                    Modern JavaScript Transformer
                  </p>
                </div>
              </div>
            </a>

            <nav className="ml-12 flex items-center">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`ml-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.href
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <a
            href="https://github.com/namsh1125/babel-playground"
            target="_blank"
            rel="noopener noreferrer"
            className="pr-8"
          >
            <img src="/img/github.png" alt="GitHub" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
