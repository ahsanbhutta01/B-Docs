"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import DocumentInput from "./DocumentInput";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import {
	BoldIcon,
	FileIcon,
	FileJsonIcon,
	FilePenIcon,
	FilePlusIcon,
	FileTextIcon,
	GlobeIcon,
	ItalicIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	StrikethroughIcon,
	TextIcon,
	TrashIcon,
	UnderlineIcon,
	Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "../[documentId]/avatars";
import { Inbox } from "../[documentId]/inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RemoveDialog from "@/components/RemoveDialog";
import RenameDialog from "@/components/RenameDialog";

interface NavbarProps {
	data: Doc<"documents">;
}

const Navbar = ({ data }: NavbarProps) => {
	const router = useRouter();
	const { editor } = useEditorStore();
	const mutation = useMutation(api.documents.create);

	function onNewDocument() {
		mutation({
			title: "Untitled document",
			initialContent: "",
		})
			.catch(() => toast.error("something went wrong"))
			.then((id) => {
				toast.success("Document created");
				router.push(`/documents/${id}`);
			});
	}

	function insertTable({ rows, cols }: { rows: number; cols: number }) {
		editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
	}

	function onDownload(blob: Blob, filename: string) {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
	}

	function onSaveJSON() {
		if (!editor) return;
		const content = editor.getJSON();
		const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
		onDownload(blob, `${data.title}.json`);
	}

	function onSaveHTML() {
		if (!editor) return;
		const content = editor.getHTML();
		const blob = new Blob([content]);
		onDownload(blob, `${data.title}.html`);
	}

	function onSaveText() {
		if (!editor) return;
		const content = editor.getText();
		const blob = new Blob([content], { type: "text/plan" });
		onDownload(blob, `${data.title}.txt`);
	}

	return (
		<nav className='flex items-center justify-between'>
			<div className='flex gap-2 items-center'>
				<Link href='/' className='relative w-[30px] h-[30px]'>
					<Image src='/favicon.svg' alt='B. Logo' fill priority />
				</Link>

				<div className='flex flex-col'>
					<DocumentInput title={data.title} id={data._id} />

					<div className='flex'>
						<Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
							<MenubarMenu>
								<MenubarTrigger className='text-sm md:text-[14px] font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
									File
								</MenubarTrigger>
								<MenubarContent className='print:hidden'>
									<MenubarSub>
										<MenubarSubTrigger>
											<FileIcon className='size-4 md:size-5 mr-2' />
											Save
										</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem onClick={onSaveJSON}>
												<FileJsonIcon className='size-4 md:size-5 mr-2' />
												JSON
											</MenubarItem>
											<MenubarItem onClick={onSaveHTML}>
												<GlobeIcon className='size-4 md:size-5 mr-2' />
												HTML
											</MenubarItem>
											<MenubarItem onClick={() => window.print()}>
												<BsFilePdf className='size-4 md:size-5 mr-2' />
												PDF
											</MenubarItem>
											<MenubarItem onClick={onSaveText}>
												<FileTextIcon className='size-4 md:size-5 mr-2' />
												Text
											</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarItem onClick={onNewDocument}>
										<FilePlusIcon className='size-4 md:size-5 mr-2' />
										New Document
									</MenubarItem>
									<MenubarSeparator />
									<RenameDialog documentId={data._id} initialTitle={data.title}>
										<MenubarItem onClick={(e) => e.stopPropagation()}
											onSelect={(e) => e.preventDefault()}>
											<FilePenIcon className='size-4 md:size-5 mr-2' />
											Rename
										</MenubarItem>
									</RenameDialog>
									<RemoveDialog documentId={data._id}>
										<MenubarItem
											onClick={(e) => e.stopPropagation()}
											onSelect={(e) => e.preventDefault()}>
											<TrashIcon className='size-4 md:size-5 mr-2' />
											Remove
										</MenubarItem>
									</RemoveDialog>
									<MenubarSeparator />
									<MenubarItem onClick={() => window.print()}>
										<PrinterIcon className='size-4 md:size-5 mr-2' />
										Print <MenubarShortcut>⌘P</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>

							<MenubarMenu>
								<MenubarTrigger className='text-sm md:text-[14px] font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
									Edit
								</MenubarTrigger>
								<MenubarContent>
									<MenubarItem
										onClick={() => editor?.chain().focus().undo().run()}>
										<Undo2Icon className='size-4 md:size-5 mr-2' />
										Undo <MenubarShortcut>⌘Z</MenubarShortcut>
									</MenubarItem>
									<MenubarItem
										onClick={() => editor?.chain().focus().redo().run()}>
										<Redo2Icon className='size-4 md:size-5 mr-2' />
										Redo <MenubarShortcut>⌘Y</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>

							<MenubarMenu>
								<MenubarTrigger className='text-sm md:text-[14px] font-semiboldfont-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
									Insert
								</MenubarTrigger>
								<MenubarContent>
									<MenubarSub>
										<MenubarSubTrigger>Table</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem
												onClick={() => insertTable({ rows: 1, cols: 1 })}>
												1 x 1
											</MenubarItem>
											<MenubarItem
												onClick={() => insertTable({ rows: 2, cols: 2 })}>
												2 x 2
											</MenubarItem>
											<MenubarItem
												onClick={() => insertTable({ rows: 3, cols: 3 })}>
												3 x 3
											</MenubarItem>
											<MenubarItem
												onClick={() => insertTable({ rows: 4, cols: 4 })}>
												4 x 4
											</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
								</MenubarContent>
							</MenubarMenu>

							<MenubarMenu>
								<MenubarTrigger className='text-sm md:text-[14px] font-semibold py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto cursor-pointer'>
									Format
								</MenubarTrigger>
								<MenubarContent>
									<MenubarSub>
										<MenubarSubTrigger>
											<TextIcon className='size-4 md:size-5 mr-2' /> Text
										</MenubarSubTrigger>
										<MenubarSubContent>
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleBold().run()
												}>
												<BoldIcon className='size-4 md:size-5 mr-2' />
												Bold <MenubarShortcut>⌘B</MenubarShortcut>
											</MenubarItem>
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleItalic().run()
												}>
												<ItalicIcon className='size-4 md:size-5 mr-2' />
												Italic <MenubarShortcut>⌘I</MenubarShortcut>
											</MenubarItem>
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleUnderline().run()
												}>
												<UnderlineIcon className='size-4 md:size-5 mr-2' />
												Underline <MenubarShortcut>⌘U</MenubarShortcut>
											</MenubarItem>
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleStrike().run()
												}>
												<StrikethroughIcon className='size-4 md:size-5 mr-2' />{" "}
												Strikethrough &nbsp;&nbsp;{" "}
												<MenubarShortcut>⌘S</MenubarShortcut>
											</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarItem>
										<RemoveFormattingIcon className='size-4 md:size-5 mr-2' />
										Clear formating
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
				</div>
			</div>

			<div className='flex gap-3 items-center pl-6'>
				<Avatars />
				<Inbox />
				<OrganizationSwitcher
					afterCreateOrganizationUrl='/'
					afterLeaveOrganizationUrl='/'
					afterSelectOrganizationUrl='/'
					afterSelectPersonalUrl='/'
				/>
				<UserButton />
			</div>
		</nav>
	);
};

export default Navbar;
