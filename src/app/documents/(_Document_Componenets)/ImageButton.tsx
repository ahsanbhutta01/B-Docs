import { useEditorStore } from "@/store/use-editor-store";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ImageButton = () => {
	const { editor } = useEditorStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	function onChange(src: string) {
		editor?.chain().focus().setImage({ src }).run();
	}

	function onUpload() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.multiple = false;

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const imageUrl = URL.createObjectURL(file);
				onChange(imageUrl);
			}
		};

		input.click();
	}

	function handleImageUrlSubmit() {
		if (imageUrl) {
			onChange(imageUrl);
			setImageUrl("");
			setIsDialogOpen(false);
		}
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden cursor-pointer'>
						<ImageIcon className='size-4 md:size-5' />
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<DropdownMenuItem onClick={onUpload}>
						<UploadIcon className='size-4 md:size-5 mr-2' />
						Upload
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
						<SearchIcon className='size-4 md:size-5 mr-2' />
						Paste image url
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Insert image URL</DialogTitle>
					</DialogHeader>
					<Input
						placeholder='Insert image URL'
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleImageUrlSubmit();
							}
						}}
					/>
					<DialogFooter>
						<Button onClick={handleImageUrlSubmit} className='cursor-pointer'>
							Insert
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ImageButton;
