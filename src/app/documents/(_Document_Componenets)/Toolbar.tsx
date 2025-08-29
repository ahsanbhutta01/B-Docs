"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import {
	BoldIcon,
	ItalicIcon,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	PrinterIcon,
	Redo2Icon,
	RemoveFormattingIcon,
	SpellCheck,
	Underline,
	Undo2Icon,
} from "lucide-react";
import FontFamilyButton from "./FontFamilyButton";
import HeadingLevelButton from "./HeadingLevelButton";
import TextColorButton from "./TextColorButton";
import HighlightColorButton from "./HighlightColorButton";
import LinkButton from "./LinkButton";
import ImageButton from "./ImageButton";
import AlignButton from "./AlignButton";
import ListButton from "./ListButton";
import FontSizeButton from "./FontSizeButton";
import LineHeightButton from "./LineHeightButton";

interface ToolbarButtonProps {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}
//icon:Icon mean i change the name "icon" to "Icon"
function ToolbarButton({ onClick, isActive, icon: Icon }: ToolbarButtonProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 cursor-pointer",
				isActive && "bg-neutral-300/80",
			)}>
			<Icon className='size-4 md:size-5' />
		</button>
	);
}

const Toolbar = () => {
	const { editor } = useEditorStore();

	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: PrinterIcon,
				onClick: () => window.print(),
			},
			{
				label: "Spell Check",
				icon: SpellCheck,
				onClick: () => {
					const current = editor?.view.dom.getAttribute("spellcheck");
					editor?.view.dom.setAttribute(
						"spellcheck",
						current === "false" ? "true" : "false",
					);
				},
			},
		],

		[
			{
				label: "Bold",
				icon: BoldIcon,
				isActive: editor?.isActive("bold"),
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: "Italic",
				icon: ItalicIcon,
				isActive: editor?.isActive("italic"),
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: "Underline",
				icon: Underline,
				isActive: editor?.isActive("underline"),
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],

		[
			{
				label: "Comment",
				icon: MessageSquarePlusIcon,
				onClick: () => editor?.chain().focus().addPendingComment().run(),
				isActive: editor?.isActive("liveblocksCommentMark"),
			},
			{
				label: "List Todo",
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(),
				isActive: editor?.isActive("taskList"),
			},
			{
				label: "Remove Formatting",
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(),
			},
		],
	];

	return (
		<div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-2 justify-center'>
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

			<Separator orientation='vertical' className='h-11 w-1 bg-neutral-500' />
			<FontFamilyButton />

			<Separator orientation='vertical' className='h-11 w-1 bg-neutral-500' />
			<HeadingLevelButton />

			<Separator orientation='vertical' className='h-11 w-1 bg-neutral-500' />
			<FontSizeButton/>

			<Separator orientation='vertical' className='h-11 w-1 bg-neutral-500' />
			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

			<TextColorButton/>
			<HighlightColorButton/>
			
			<Separator orientation='vertical' className='h-11 w-1 bg-neutral-500' />
			<LinkButton/>
			<ImageButton/>
			<AlignButton/>
			<LineHeightButton/>
			<ListButton/>

			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

		</div>
	);
};

export default Toolbar;
