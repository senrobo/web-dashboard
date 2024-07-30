interface VerticalNavbarProps {
  setActivePage: (page: string) => void;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({ setActivePage }) => {
  return (
    <div className="col-span-1 h-full bg-gray-800 text-white flex flex-col items-center">
      <button onClick={() => setActivePage("dashboard")}>
        <span>Dashboard</span>
      </button>
      <button onClick={() => setActivePage("ports")}>
        <span>Ports</span>
      </button>
      <button onClick={() => setActivePage("peripherals")}>
        <span>Peripherals</span>
      </button>
      <button onClick={() => setActivePage("tune")}>
        <span>Tune</span>
      </button>
      <button onClick={() => setActivePage("info")}>
        <span>Info</span>
      </button>
    </div>
  );
};

export default VerticalNavbar;
