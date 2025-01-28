const Footer = () => {
  return (
    <footer className="py-6 px-6 bg-gray-100">
      <div className="flex flex-col items-center gap-2 text-gray-600">
        <p className="text-sm">© 2025 Babel Playground</p>
        <a
          href="https://babeljs.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          Learn more about Babel
        </a>
      </div>
    </footer>
  );
};

export default Footer;
