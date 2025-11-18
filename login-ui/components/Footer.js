export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-white/5 backdrop-blur-xl shadow-inner">
      <div className="mx-auto max-w-6xl px-6 py-4 
      flex flex-col sm:flex-row items-center justify-between 
      text-sm text-gray-300">

        <p className="text-gray-400">
          &copy; {year} <span className="text-cyan-300 font-semibold">LMS App</span>. 
          All rights reserved.
        </p>

        <div className="mt-2 sm:mt-0 flex items-center gap-6">

          <a className="hover:text-cyan-300 transition-colors duration-300"
             href="/">
            Home
          </a>

          <a className="hover:text-purple-300 transition-colors duration-300"
             href="/signin">
            Sign In
          </a>

          <a className="hover:text-pink-300 transition-colors duration-300"
             href="/dashboard">
            Dashboard
          </a>

        </div>
      </div>
    </footer>
  );
}
