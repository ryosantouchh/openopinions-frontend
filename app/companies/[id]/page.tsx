"use client";

import { Avatar, Button, Tab, Tabs } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ReviewCardOverview, ReviewOverviewType } from "@/app/components/reviewCards/reviewCardOverview";
import { ReviewCardInterview, ReviewInterviewType } from "@/app/components/reviewCards/reviewCardInterview";
import { ReviewCardSalary, ReviewSalaryType, SalaryRangeCard } from "@/app/components/reviewCards/reviewCardSalary";
import { ReviewBenefitsType, ReviewCardBenefits } from "@/app/components/reviewCards/reviewCardBenefits";
import { Difficulty } from "@/app/consts/difficulty";
import Link from "next/link";
import { getImageUrl } from "@/app/utils/name";

export default function CompanyDetailsPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");
    const [overviewReviews, setOverviewReviews] = useState<ReviewOverviewType[]>([]);
    const [interviewReviews, setInterviewReviews] = useState<ReviewInterviewType[]>([]);
    const [salaryReviews, setSalaryReviews] = useState<ReviewSalaryType[]>([]);
    const [benefitsReviews, setBenefitsReviews] = useState<ReviewBenefitsType[]>([]);
    useEffect(() => {
        const fetchReviews = async () => {
            if (activeTab === "overview") {
                const reviews = await fetchOverviewReviews(id as string);
                setOverviewReviews(reviews);
            } else if (activeTab === "interviews") {
                const reviews = await fetchInterviewReviews(id as string);
                setInterviewReviews(reviews);
            } else if (activeTab === "salaries") {
                const reviews = await fetchSalaryReviews(id as string);
                setSalaryReviews(reviews);
            } else if (activeTab === "benefits") {
                const reviews = await fetchBenefitsReviews(id as string);
                setBenefitsReviews(reviews);
            }
        };

        fetchReviews();
    }, [activeTab, id]);

    return (
        <div>
            {/* Company Banner */}
            <div
                className="h-32 w-full bg-cover bg-center"
                style={{ backgroundColor: "lime" }}
            />
            <div className="pb-4 px-4">
                {/* Company Details */}
                <Avatar
                    className="h-16 w-16 translate-y-[-20%]"
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/1063907?v=4"
                    alt="Company Logo"
                />
                <div className="flex items-end justify-between">
                    <div className="flex flex-col items-start">
                        <h2 className="text-2xl font-bold text-gray-800">Agogo</h2>
                        <div className="flex items-center">
                            <p className="text-xl font-medium mr-4">Overall Rating</p>
                            <span className="text-xl font-medium mr-1">4.5</span>
                            <Icon icon="fluent:star-28-filled" className="text-yellow-500" />
                        </div>
                    </div>
                    <Button color="primary"
                        as={Link}
                        href="/reviews/create"
                    >
                        Write a Review
                    </Button>
                </div>

                {/* Tabs with Reviews */}
                <Tabs
                    variant="underlined"
                    className="w-full mt-6 mb-1"
                    aria-label="Dynamic tabs"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key.toString())}
                >
                    <Tab key="overview" title="Overview">
                        {overviewReviews.length > 0 ? (
                            overviewReviews.map((review) => (
                                <ReviewCardOverview key={review.id} {...review} />
                            ))
                        ) : (
                            <p>No overview reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="interviews" title="Interviews">
                        {interviewReviews.length > 0 ? (
                            interviewReviews.map((review) => (
                                <ReviewCardInterview key={review.id} {...review} />
                            ))
                        ) : (
                            <p>No interview reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="salaries" title="Salaries">
                        {salaryReviews.length > 0 ? (
                            <>
                                <SalaryRangeCard role="Software Engineer" salaries={[100000, 200000]} />
                                <SalaryRangeCard role="Product Manager" salaries={[80000, 150000]} />
                            </>
                        ) : (
                            <p>No salary reviews available.</p>
                        )}
                    </Tab>
                    <Tab key="benefits" title="Benefits">
                        {benefitsReviews.length > 0 ? (
                            benefitsReviews.map((review) => (
                                <ReviewCardBenefits key={review?.id} {...review} />
                            ))
                        ) : (
                            <p>No benefits reviews available.</p>
                        )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

async function fetchOverviewReviews(companyId: string): Promise<ReviewOverviewType[]> {
    return [
        {
            id: "1",
            user: { name: "0x123bhj1dasd123bh1j23", avatar: getImageUrl("0x123bhj1dasd123bh1j23") },
            createdAt: "2023-11-10",
            rating: 4.5,
            title: "Great place!",
            content: "Had an amazing experience.",
        },
        {
            id: "2",
            user: { name: "0x12312312312", avatar: getImageUrl("0x12312312312") },
            createdAt: "2023-10-20",
            rating: 2,
            title: "Good, but...",
            content: "Decent place, could be better.",
        },
    ];
}

async function fetchInterviewReviews(companyId: string): Promise<ReviewInterviewType[]> {
    return [
        {
            id: "1",
            user: { name: "Candidate 1", avatar: getImageUrl("Candidate 1") },
            createdAt: "2023-09-15",
            difficulty: Difficulty.VERY_EASY,
            title: "Challenging interview",
            content: "It was a tough process, but I learned a lot.",
        },
        {
            id: "2",
            user: { name: "Candidate 2", avatar: getImageUrl("Candidate 2") },
            createdAt: "2023-09-15",
            difficulty: Difficulty.EASY,
            title: "Challenging interview",
            content: "It was a tough process, but I learned a lot.",
        },
        {
            id: "3",
            user: { name: "Candidate 3", avatar: getImageUrl("Candidate 3") },
            createdAt: "2023-09-15",
            difficulty: Difficulty.MEDIUM,
            title: "Challenging interview",
            content: "It was a tough process, but I learned a lot.",
        },
        {
            id: "4",
            user: { name: "Candidate 4", avatar: getImageUrl("Candidate 4") },
            createdAt: "2023-09-15",
            difficulty: Difficulty.HARD,
            title: "Challenging interview",
            content: "It was a tough process, but I learned a lot.",
        },
        {
            id: "5",
            user: { name: "Candidate 5", avatar: getImageUrl("Candidate 5") },
            createdAt: "2023-09-15",
            difficulty: Difficulty.VERY_HARD,
            title: "Challenging interview",
            content: "It was a tough process, but I learned a lot.",
        },
    ];
}

async function fetchSalaryReviews(companyId: string): Promise<ReviewSalaryType[]> {
    return [
        {
            id: "1",
            user: { name: "Salary 1", avatar: getImageUrl("Salary 1") },
            createdAt: "2023-09-15",
            salary: 100000,
            role: "Software Engineer",
        },
        {
            id: "2",
            user: { name: "Salary 2", avatar: getImageUrl("Salary 2") },
            createdAt: "2023-09-15",
            salary: 200000,
            role: "Software Engineer",
        },
    ];
}

async function fetchBenefitsReviews(companyId: string): Promise<ReviewBenefitsType[]> {
    return [
        {
            id: "1",
            user: { name: "0x123bhj1dasd123bh1j23", avatar: getImageUrl("0x123bhj1dasd123bh1j23") },
            createdAt: "2023-11-10",
            health_insurance: 1,
            stock_plan: 2,
            stock_options: 0,
            annual_leave: 1,
            l_and_d: 2,
        },
        {
            id: "2",
            user: { name: "0x12312312312", avatar: getImageUrl("0x12312312312") },
            createdAt: "2023-10-20",
            health_insurance: 1,
            stock_plan: 1,
            stock_options: 1,
            annual_leave: 1,
            l_and_d: 1,
        },
    ];
}
