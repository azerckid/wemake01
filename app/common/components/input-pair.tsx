import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import type { InputHTMLAttributes } from "react";

export type InputPairProps = {
    label: string;
    description: string;
    id: string;
    placeholder: string;
    textArea?: boolean;
    error?: string;
};

export default function InputPair({ label, description, textArea = false, ...rest }: InputPairProps & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
    return (
        <div className="space-y-2">
            <Label htmlFor={rest.id} className="flex flex-col gap-2">
                {label}
                <small className="text-gray-500">
                    {description}
                </small>
            </Label>
            {textArea ? <Textarea rows={5} className="resize-none" {...rest} /> : <Input {...rest} />}
        </div>
    )
}

