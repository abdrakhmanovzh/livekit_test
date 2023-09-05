import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState("");

    const handleSubmit = () => {
        router.push(`/room?username=${username}`);
    };

    return (
        <>
            <Head>
                <title>Video Chat</title>
            </Head>
            <main
                className={`flex min-h-screen flex-col items-center gap-10 p-24 ${inter.className}`}
            >
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-xl p-2 bg-transparent ring-2 ring-black rounded-lg outline-none"
                    placeholder="Enter your name"
                />
                <button
                    onClick={handleSubmit}
                    className="text-3xl bg-neutral-500 p-4 rounded-lg text-white"
                >
                    Enter chat
                </button>
            </main>
        </>
    );
}
