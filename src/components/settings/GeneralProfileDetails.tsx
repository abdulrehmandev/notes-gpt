import type { Session } from "next-auth";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import { cn } from "@/lib/utils";

interface GeneralProfileDetailsProps {
  session: Session;
}

const GeneralProfileDetails: FC<GeneralProfileDetailsProps> = ({ session }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-w-xl">
        <div className="space-y-2">
          <Label>ID</Label>
          <Input value={session.user.id} disabled />
          <p className="text-zinc-700 text-[0.8rem]">
            Each user has a unique Identifier (ID) assigned by the system and it
            is not changeable.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={session.user.email as string} disabled />
          <p className="text-zinc-700 text-[0.8rem]">
            The email address is not changeable.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralProfileDetails;
