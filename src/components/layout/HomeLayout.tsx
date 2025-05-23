import Squares from "@/components/layout/Square";
import { Outlet } from "react-router-dom";
export default function HomePage() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <Squares
                direction="diagonal"
                speed={0.2}
                squareSize={36}
                borderColor="#555"
                hoverFillColor="#999"
            />

            {/* 👇 Nội dung nằm trên nền */}
            <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
                <Outlet />
            </div>
        </div>
    );
}
