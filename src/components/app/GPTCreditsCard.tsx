import React from "react";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const GPTCreditsCard = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>GPT Credits</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Available Credits: 121</p>
      </CardContent>
      <CardFooter className="gap-3">
        <Button size="sm" variant="secondary">
          View Details
        </Button>
        <Button variant="primary" size="sm">
          Buy More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GPTCreditsCard;
