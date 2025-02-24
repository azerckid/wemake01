import { useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "~/lib/utils";

export type SelectPairProps = {
    label: string;
    description: string;
    id: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    options: {
        label: string;
        value: string;
    }[];
    className?: string;
};

export default function SelectPair({ label, description, id, name, required = false, placeholder = "Select an option", options, className, ...rest }: SelectPairProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={cn("space-y-2 flex flex-col", className)}>
            <Label className="flex flex-col" onClick={() => setOpen(!open)} htmlFor={id}>
                {label}
                <small className="text-gray-500">
                    {description}
                </small>
            </Label>
            <Select name={name} required={required} {...rest} open={open} onOpenChange={setOpen}>
                <SelectTrigger className={cn("bg-background", open && "bg-background")}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className={cn("bg-background", open && "bg-background")}>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}