"use client";

import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useConvexAuth } from "convex/react";
import { Loader2, ShieldX } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Sidebar } from './_components/Sidebar';

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useConvexAuth();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            setShowAlert(true);
            setTimeout(() => {
                router.push("/");
            }, 50000); 
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 />
            </div>
        );
    }

    if (showAlert) {
        return (
            <div className="h-full flex items-center justify-center fixed inset-0 bg-gray-700 bg-opacity-75 z-50 ">
                <div className="max-w-md w-full p-6 text-lg">
                    <Alert className='text-red-500'>
                        <ShieldX/>
                        <AlertTitle>Unauthorized</AlertTitle>
                        <AlertDescription>
                            You need to login before entering our dashboard
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex">
            <Sidebar/>
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
