"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { SidebarOpen } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/Sheet";
import SettingsSidebarContent from "./SettingsSidebarContent";

const SettingsMobileSheet = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mt-2 gap-4">
        <h1 className="font-semibold tracking-tighter text-3xl">Settings</h1>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsDrawerOpen(true)}
        >
          <SidebarOpen className="w-4 h-4 text-zinc-700 rotate-180" />
        </Button>
      </div>
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="left">
          <h1 className="font-semibold tracking-tighter text-xl mb-4">
            Settings
          </h1>
          <SettingsSidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SettingsMobileSheet;
