import { Children, ElementType, ReactNode, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "../components/Button";
import { playlists, subscriptions } from "../data/sidebar";
import { useSideBarContext } from "../contexts/SideBarContext";
import { LogoSection } from "./Header";

export const SideBar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSideBarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSideBarItem Icon={Home} title="Home" url="#" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="#" />
        <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="#" />
        <SmallSideBarItem Icon={Library} title="Library" url="#" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <LogoSection />
        </div>
        <LargeSideBarSection>
          <LargeSideBarItem isActive IconOrImgUrl={Home} title="Home" url="#" />
          <LargeSideBarItem
            IconOrImgUrl={Clapperboard}
            title="Subscription"
            url="#"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem IconOrImgUrl={Library} title="Library" url="#" />
          <LargeSideBarItem IconOrImgUrl={History} title="History" url="#" />
          <LargeSideBarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="#"
          />
          <LargeSideBarItem IconOrImgUrl={Clock} title="Watch Later" url="#" />
          {playlists.map((playlist) => {
            const { id, name } = playlist;
            return (
              <LargeSideBarItem
                key={id}
                IconOrImgUrl={ListVideo}
                title={name}
                url="#"
              />
            );
          })}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Subscriptions">
          {subscriptions.map((subscription) => {
            const { id, channelName, imgUrl } = subscription;
            return (
              <LargeSideBarItem
                key={id}
                IconOrImgUrl={imgUrl}
                title={channelName}
                url="#"
              />
            );
          })}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSideBarItem IconOrImgUrl={Flame} title="Trending" url="#" />
          <LargeSideBarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="#"
          />
          <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="#" />
          <LargeSideBarItem IconOrImgUrl={Film} title="Movies & TV" url="#" />
          <LargeSideBarItem IconOrImgUrl={Radio} title="Live" url="#" />
          <LargeSideBarItem IconOrImgUrl={Gamepad2} title="Gaming" url="#" />
          <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="#" />
          <LargeSideBarItem IconOrImgUrl={Trophy} title="Sports" url="#" />
          <LargeSideBarItem IconOrImgUrl={Lightbulb} title="Learning" url="#" />
          <LargeSideBarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="#"
          />
          <LargeSideBarItem IconOrImgUrl={Podcast} title="Podcasts" url="#" />
        </LargeSideBarSection>
      </aside>
    </>
  );
};

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSideBarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSideBarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img
          src={IconOrImgUrl}
          className="w-6 h-6 rounded-full"
          alt="channel icon"
        />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
