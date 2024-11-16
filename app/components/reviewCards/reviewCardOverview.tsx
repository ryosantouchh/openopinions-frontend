"use client";

import React from "react";
import { User } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";
import Link from 'next/link'
export type ReviewOverviewType = {
    record_id: string;
    user: {
        name: string;
        avatar: string;
    };
    created_at: string;
    rating: number;
    title: string;
    content: string;
};

export type ReviewOverviewProps = React.HTMLAttributes<HTMLDivElement> & ReviewOverviewType;

export const ReviewCardOverview = React.forwardRef<HTMLDivElement, ReviewOverviewProps>(
    ({ children, user, title, content, rating, created_at, record_id: id, ...props }, ref) => (
        <Link href={`/reviews/overview/${id}`}>
            <div ref={ref} {...props} className="border-b pb-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User
                            avatarProps={{
                                src: user.avatar,
                            }}
                            classNames={{
                                name: "font-medium",
                                description: "text-small",
                            }}
                            description={new Intl.DateTimeFormat("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            }).format(new Date(created_at))}
                            name={user.name}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => {
                            const isFullStar = i < Math.floor(rating);
                            const isHalfStar = i === Math.floor(rating) && rating % 1 !== 0;
                            return (
                                <Icon
                                    key={i}
                                    className={cn(
                                        "text-lg sm:text-xl",
                                        "text-warning",
                                    )}
                                    icon={
                                        isFullStar
                                            ? "fluent:star-28-filled"
                                            : isHalfStar
                                                ? "fluent:star-half-28-regular"
                                                : "fluent:star-28-regular"
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <p className="font-medium text-default-900">{title}</p>
                    <p className="mt-2 text-default-500">{content || children}</p>
                </div>
            </div>
        </Link >
    ),
);