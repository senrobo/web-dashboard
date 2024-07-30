import { Info, Home, Tool, Target } from "react-feather";
import { Separator } from "@/components/ui/separator";

interface VerticalNavbarProps {
  setActivePage: (page: string) => void;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({ setActivePage }) => {
  return (
    <div className="col-span-1 border flex flex-col rounded-md shadow">
      <div className="hover:bg-primary-foreground/90 p-4 duration-300">
        <button
          className="flex items-center text-lg font-semibold text-left duration-150 rounded-sm"
          onClick={() => setActivePage("dashboard")}
        >
          <Home className="w-5 h-5 mr-2" />
          <span>Dashboard</span>
        </button>
      </div>
      <Separator />

      <div className="hover:bg-primary-foreground/90 p-4 duration-300">
        <button
          className="flex items-center text-lg font-semibold text-left duration-150 rounded-sm"
          onClick={() => setActivePage("peripherals")}
        >
          <Target className="w-5 h-5 mr-2" />
          <span>Peripherals</span>
        </button>
      </div>

      <Separator />

      <div className="hover:bg-primary-foreground/90 p-4 duration-300">
        <button
          className="flex items-center text-lg font-semibold text-left duration-150 rounded-sm"
          onClick={() => setActivePage("tune")}
        >
          <Tool className="w-5 h-5 mr-2" />
          <span>Tune</span>
        </button>
      </div>
    </div>
  );
};

export default VerticalNavbar;
