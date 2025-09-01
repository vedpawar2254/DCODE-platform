import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

export const AuthLayout = () => {
  return (
    <div className="relative flex flex-row h-screen w-screen overflow-hidden">
      {/* Background Gradient Circles */}
      <img
        src="/images/Group97.png"
        alt="DCODE BG"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      />

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-row w-full h-full">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};
