import { FC } from "react";

import SettingsSidebarContent from "@/components/shared/SettingsSidebarContent";
import Container from "@/components/layout/Container";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children }) => {
  return (
    <Container className="py-6">
      <div className="flex h-screen flex-col gap-6 md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SettingsSidebarContent />
        </div>
        <div className="flex-grow py-6 px-6 md:overflow-y-auto">{children}</div>
      </div>
    </Container>
  );
};

export default SettingsLayout;
