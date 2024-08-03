import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white p-4 border-b-2 border-customBorder shadow-md">
        <div className="container mx-auto flex justify-center items-center p-4">
          <div className="text-primary text-xl font-bold">
            <Link href="/">Hacker News App</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
