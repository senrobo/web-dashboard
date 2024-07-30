import { House, Target, Wrench } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface VerticalNavbarProps {
  setActivePage: (page: string) => void;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({ setActivePage }) => {
  return (
    <div className="col-span-1 border flex flex-col rounded-md shadow">
      <button className="hover:bg-primary-foreground/90 p-4 duration-300">
        <div
          className="flex items-center text-lg font-semibold text-left duration-150 rounded-sm"
          onClick={() => setActivePage("dashboard")}
        >
          <House className="w-5 h-5 mr-2" />
          <span>Dashboard</span>
        </div>
      </button>
      <Separator />

      <button className="hover:bg-primary-foreground/90 p-4 duration-300">
        <div
          className="flex items-center text-lg font-semibold text-left duration-150 rounded-sm"
          onClick={() => setActivePage("peripherals")}
        >
          <Target className="w-5 h-5 mr-2" />
          <span>Peripherals</span>
        </div>
      </button>

      <Separator />

      <button className="hover:bg-primary-foreground/90 p-4 duration-300">
        <div
          className="flex items-center text-lg font-semibold text-left duration-150 rounded-sm"
          onClick={() => setActivePage("toonig")}
        >
          <Wrench className="w-5 h-5 mr-2" />
          <span>Toonig</span>
        </div>
      </button>
    </div>
  );
};

export default VerticalNavbar;
