import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

interface SelectScrollableProps {
  placeholder: string;
  items?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectScrollable({ placeholder, items, value, onChange }: SelectScrollableProps) {
  return (
    <>
    <Label htmlFor="select-scrollable">{placeholder}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
          {items?.map((item) => (
            <SelectItem value={item.value}>
              {item.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
    </>
  )
}

