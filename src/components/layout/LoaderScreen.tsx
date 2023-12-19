import { Loader } from "lucide-react";
import React, { FC } from "react";

interface LoadingScreenProp {}

const LoadingScreen: FC<LoadingScreenProp> = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-3 items-center justify-center">
      <Loader className="w-6 h-6 animate-spin " />
      <h5 className="text-zinc-700 font-medium text-sm">Please wait...</h5>
    </div>
  );
};

export default LoadingScreen;
