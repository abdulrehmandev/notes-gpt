"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { SidebarOpen } from "lucide-react";
import { Sheet, SheetContent } from "../ui/Sheet";
import SettingsSidebarContent from "./SettingsSidebarContent";

const SettingsMobileSheet = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-semibold tracking-tighter text-4xl text-zinc-500">
          Settings
        </h1>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsDrawerOpen(true)}
        >
          <SidebarOpen className="w-4 h-4 text-zinc-500 rotate-180" />
        </Button>
      </div>
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="left">
          <SettingsSidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SettingsMobileSheet;
