"use client";

import type { NavbarProps } from "@nextui-org/react";

import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Link,
    Divider,
} from "@nextui-org/react";
import { cn } from "@nextui-org/react";

import { AcmeIcon } from "./acme";

const menuItems = [
    {
        label: "Companies",
        href: "/companies",
    },
    {
        label: "AI",
        href: "/ai",
    }
];

export default function Component(props: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar
            {...props}
            classNames={{
                base: cn("border-default-100", {
                    "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
                }),
                wrapper: "w-full justify-center",
                item: "hidden md:flex",
            }}
            height="60px"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            {/* Left Content */}
            <NavbarBrand>
                <div className="rounded-full bg-foreground text-background">
                    <AcmeIcon size={34} />
                </div>
                <Link className="ml-2 text-small font-medium text-foreground" href="/" size="md">
                    OpenOpinions
                </Link>
            </NavbarBrand>

            {/* Center Content */}
            <NavbarContent justify="center">
                <NavbarItem>
                    <Link className="text-default-500" href="#" size="sm">
                        Companies
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {/* Right Content */}
            {/* <NavbarContent className="hidden md:flex" justify="end">
                <NavbarItem className="ml-2 !flex gap-2">
                    <Button className="text-default-500" radius="full" variant="light">
                        Login
                    </Button>
                    <Button
                        className="bg-foreground font-medium text-background"
                        color="secondary"
                        endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                        radius="full"
                        variant="flat"
                    >
                        Get Started
                    </Button>
                </NavbarItem>
            </NavbarContent> */}

            <NavbarMenuToggle className="text-default-400 md:hidden" />

            <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                {/* <NavbarMenuItem>
                    <Button fullWidth as={Link} href="/#" variant="faded">
                        Sign In
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem className="mb-4">
                    <Button fullWidth as={Link} className="bg-foreground text-background" href="/#">
                        Get Started
                    </Button>
                </NavbarMenuItem> */}
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link className="mb-2 w-full text-default-500" href={item.href} size="md">
                            {item.label}
                        </Link>
                        {index < menuItems.length - 1 && <Divider className="opacity-50" />}
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
