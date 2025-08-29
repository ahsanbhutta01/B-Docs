import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from 'react-hot-toast';
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata = {
	title: "Docx by B. Company",
	description:
		"This product looks like Google Docs where you can create documents with all feature like google docs",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<NuqsAdapter>
					<ConvexClientProvider>
						<Toaster/>
						{children}
					</ConvexClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
