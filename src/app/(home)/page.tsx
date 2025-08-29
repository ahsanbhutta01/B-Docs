'use client'

import Navbar from "./Navbar";
import TempletesGallery from "./TempletesGallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "./DocumentsTable";
import { useSearchParam } from "@/hooks/use-search-param";

export default function Home() {
	const [search] = useSearchParam()


	const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {search}, {initialNumItems:5})
	return (
		<div className='min-h-screen flex flex-col'>

			<section className='fixed top-0 right-0 left-0 z-10 p-4 h-16 bg-white'>
				<Navbar />
			</section>

			<section className="mt-16">
				<TempletesGallery/>
				<DocumentsTable documents={results} loadMore={loadMore} status={status}/>
			</section>
		</div>
	);
}
