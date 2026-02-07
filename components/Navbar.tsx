export default function Navbar() {
  return (
    <header className="w-full py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <h1 className="font-semibold text-xl">AI Studio</h1>
        <nav className="flex items-center gap-8 text-sm text-gray-600">
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <button className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:opacity-90">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}
