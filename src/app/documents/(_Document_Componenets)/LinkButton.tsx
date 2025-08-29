import { useEditorStore } from "@/store/use-editor-store";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";

const LinkButton = () => {
	const { editor } = useEditorStore();
	const [value, setValue] = useState(editor?.getAttributes("link").href || "");

	function onChange(href: string) {
		editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
		setValue("");
	}
	return (
		<DropdownMenu
			onOpenChange={(open) => {
				if(open){
               setValue(editor?.getAttributes("link").href || "");
            }
			}}>
			<DropdownMenuTrigger asChild>
				<button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden cursor-pointer'>
					<Link2Icon className='size-4 md:size-5' />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='p-2.5 flex items-center gap-x-1.5'>
				<Input
					placeholder='https://example.com'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button onClick={() => onChange(value)} className="shadow-xs cursor-pointer hover:bg-amber-100 hover:text-black bg-black text-white duration-300 px-4.5 py-2 rounded-md text-sm">Apply</button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LinkButton;
