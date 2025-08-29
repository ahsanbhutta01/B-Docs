"use client";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import { useEditorStore } from "@/store/use-editor-store";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtention } from "@/extensions/font-size";
import { LineHeightExtention } from "@/extensions/line-height";
import Ruler from "./Ruler";
import { Threads } from "./Threads";
import { useStorage } from "@liveblocks/react";

interface EditorProps{
	initialContent?:string | undefined
}

const Editor = ({initialContent}:EditorProps) => {
	const liveblocks = useLiveblocksExtension({
		initialContent, 
		offlineSupport_experimental:true
	});
	const { setEditor } = useEditorStore();
	const leftMargin = useStorage((root)=>root.leftMargin)
	const rightMargin=useStorage((root)=>root.rightMargin)

	const editor = useEditor({
		immediatelyRender: false,
		onCreate({ editor }) {
			setEditor(editor);
		},
		onDestroy() {
			setEditor(null);
		},
		onUpdate({ editor }) {
			setEditor(editor);
		},
		onSelectionUpdate({ editor }) {
			setEditor(editor);
		},
		onTransaction({ editor }) {
			setEditor(editor);
		},
		onFocus({ editor }) {
			setEditor(editor);
		},
		onBlur({ editor }) {
			setEditor(editor);
		},
		onContentError({ editor }) {
			setEditor(editor);
		},

		editorProps: {
			attributes: {
				style: `padding-left:${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px`,
				class: "focus:outline-none print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
			},
		},
		extensions: [
			liveblocks,
			StarterKit.configure({history:false}),
			FontSizeExtention,
			LineHeightExtention,
			FontFamily,
			TextStyle,
			TaskItem.configure({ nested: true }),
			TaskList,
			Table,
			TableCell,
			TableHeader,
			TableRow,
			ImageResize,
			Underline,
			Color,
			Highlight.configure({ multicolor: true }),
			Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		]
	});

	return (
		<>
			<div className='size-full overflow-x-auto bg-[#FAFBFA] px-4 print:p-0 print:bg-white print:overflow-visible '>
				
				<Ruler />

				<section className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 '>
					<EditorContent editor={editor} />
					<Threads editor={editor}/>
				</section>
			</div>
		</>
	);
};

export default Editor;
