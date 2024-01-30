import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Badge } from "../ui/Badge";

export enum Delimiter {
  Comma = ",",
  Enter = "Enter",
}

interface TagInputProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  label?: string;
  tagVariant?: "default" | "secondary" | "destructive" | "outline";
}

export const TagInput: React.FC<TagInputProps> = ({
  value,
  onValueChange,
  label = "Tags",
  tagVariant = "secondary",
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Delimiter.Enter || e.key === Delimiter.Comma) {
      e.preventDefault();

      const newTagText = inputValue.trim();

      if (newTagText.length === 0 || newTagText.length > 20) {
        setInputValue("");
        return;
      }

      onValueChange([...value, newTagText]);
      setInputValue("");
    }
  };

  return (
    <div>
      <Label>
        {label}{" "}
        <span className="ml-3 text-xs text-zinc-400 font-normal">
          {value.length + "/5"}
        </span>
      </Label>
      {value.length > 0 && (
        <div className="mt-2 mb-2 flex flex-wrap gap-1">
          {value?.map((tag) => (
            <Badge
              onClick={() => {
                onValueChange(
                  value.filter(function (item) {
                    return item !== tag;
                  })
                );
              }}
              removable
              key={tag}
              variant={tagVariant}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <Input
        value={inputValue}
        className={`w-full ${value.length === 0 ? "mt-2" : ""}`}
        placeholder="Add a tag..."
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        disabled={value.length >= 5}
        onKeyDown={handleKeyDown}
      />
      <p className="text-xs mt-2">Each tag can be maximum of 20 characters.</p>
    </div>
  );
};
