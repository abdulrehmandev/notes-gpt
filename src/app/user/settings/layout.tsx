import { FC } from "react";

import SettingsSidebarContent from "@/components/settings/SettingsSidebarContent";
import Container from "@/components/layout/Container";
import SettingsMobileSheet from "@/components/settings/SettingsMobileSheet";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <Container className="py-6">
      <div className="block md:hidden">
        <SettingsMobileSheet />
      </div>
      <div className="relative">
        <div className="hidden fixed md:block w-full md:w-60">
          <SettingsSidebarContent />
        </div>
        <div className="md:pl-60">{children}</div>
      </div>
    </Container>
  );
};

export default SettingsLayout;

/**
 * <Container className="py-6">
      <div className="block md:hidden">
        <SettingsMobileSheet />
      </div>
      <div className="flex h-screen flex-row gap-6 md:overflow-hidden">
        <div className="hidden md:block w-full flex-none md:w-60">
          <SettingsSidebarContent />
        </div>
        <div className="flex-grow py-6 lg:px-6 md:overflow-y-auto">
          {children}
        </div>
      </div>
    </Container>
 */
