import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar"
import { StarIcon } from "lucide-react"
import { DateTime } from "luxon"

interface ReviewCardProps {
    avatarUrl: string | null
    avatarFallback: string
    name: string
    username: string
    rating: number
    content: string
    createdAt: string
}

export function ReviewCard({
    avatarUrl,
    avatarFallback,
    name,
    username,
    rating,
    content,
    createdAt
}: ReviewCardProps) {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={avatarUrl ?? undefined} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="text-lg font-semibold">{name}</h4>
                    <p className="text-sm text-muted-foreground">@{username}</p>
                </div>
            </div>
            <div className="flex gap-2">
                {Array.from({ length: rating }).map((_, index) => (
                    <StarIcon key={index} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                ))}
            </div>
            <p className="text-sm text-muted-foreground">{content}</p>
            <span className="text-sm text-muted-foreground">{DateTime.fromISO(createdAt).toRelative()}</span>
        </div>
    )
} 