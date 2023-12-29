import { FC } from "react";

import SettingsSidebarContent from "@/components/settings/SettingsSidebarContent";
import Container from "@/components/layout/Container";
import SettingsMobileSheet from "@/components/settings/SettingsMobileSheet";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <Container>
      <div className="block md:hidden">
        <SettingsMobileSheet />
      </div>
      <div className="relative flex">
        <div className="hidden md:block w-full md:w-60 pt-20">
          <SettingsSidebarContent />
        </div>
        <div className="w-full pt-6">{children}</div>
      </div>
    </Container>
  );
};

export default SettingsLayout;
