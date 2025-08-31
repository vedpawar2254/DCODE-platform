import { LeftSide } from './LeftSide';
import { RightSide } from './RightSide';

export const AuthLayout = () => {
  return (
    <div className="flex flex-row h-screen w-screen">
      <LeftSide />
      <RightSide />
    </div>
  );
};
