import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="fixed top-0 z-10 py-6 md:py-8  w-full bg-[#191D26] shadow-2xl">
      <div className="container mx-auto flex items-center">
        <a href="/">
          <img className="h-16" src={logo} alt="TaskMaster" />
        </a>
        <h2 className="text-2xl font-semibold">TaskMaster</h2>
      </div>
    </nav>
  );
}
