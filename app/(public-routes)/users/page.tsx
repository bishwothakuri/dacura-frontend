'use client';
import { useListUsers } from '@/modules/user/user.service';
import { ChevronRight, Mail, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function page() {
    const { data }: any = useListUsers({});

    const rows = data?.data?.rows || [];

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Users ({rows.length})
                </h1>
                <div className="flex justify-between">
                    <p className="text-muted-foreground">
                        Manage and view all users in your system
                    </p>
                    <Link className="text-blue-400" href="/">
                        Go Back
                    </Link>
                </div>
            </div>

            {/* Search Input */}
            <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
            </div>

            {/* Users List */}
            <div className="bg-card rounded-xl border border-input overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {rows.length > 0 ? (
                    <div className="divide-y divide-input">
                        {rows.map((user: any) => (
                            <div
                                key={user.cuid}
                                className="px-6 py-4 hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between group cursor-pointer"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <ChevronRight className="w-6 h-6 text-primary" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-foreground truncate">
                                                {user.firstName} {user.lastName}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                                            <Mail className="w-4 h-4 shrink-0" />
                                            <a
                                                href={`mailto:${user.email}`}
                                                className="hover:text-primary transition-colors truncate"
                                            >
                                                {user.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Chevron */}
                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary ml-4 flex-shrink-0 transition-colors" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="px-6 py-16 text-center">
                        <ChevronRight className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            No users found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search query
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
