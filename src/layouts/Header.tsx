import { useState } from "react";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/logo.svg";
import { Button } from "../components";
import { useSideBarContext } from "../contexts/SideBarContext";

export const Header = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <LogoSection showFullWidthSearch={showFullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            className="flex-shrink-0"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-px px-4 text-lg w-full focus:border-blue-500 outline-none"
            placeholder="Search..."
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          className="md:hidden"
          variant="ghost"
          size="icon"
        >
          <Search />
        </Button>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Mic />
        </Button>
        <Button variant="ghost" size="icon">
          <Upload />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <Button variant="ghost" size="icon">
          <User />
        </Button>
      </div>
    </div>
  );
};

type LogoSectionProps = {
  showFullWidthSearch?: boolean;
};

export const LogoSection = ({
  showFullWidthSearch = false,
}: LogoSectionProps) => {
  const { toggle } = useSideBarContext();

  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        showFullWidthSearch ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="#">
        <img src={logo} className="h-6" alt="youtube logo" />
      </a>
    </div>
  );
};
