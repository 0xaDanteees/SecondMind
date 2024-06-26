import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/brain.png"
                height={40}
                width={40}
                alt="Logo_light"
                className="light: block dark:hidden"
            />
            <Image
                src="/brain.png"
                height={40}
                width={40}
                alt="Logo_dark"
                className="hidden dark:block"
            />
            <p className={cn("font-extrabold text-[#256C5D] dark:text-white", font.className)}>
                Second <br/>
                <span className="block text-center">Mind</span>
            </p>
        </div>
    );
};