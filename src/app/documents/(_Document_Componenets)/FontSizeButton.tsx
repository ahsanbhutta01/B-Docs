
import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

const FontSizeButton = () => {
	const { editor } = useEditorStore();
	const currentFontSize = editor?.getAttributes("textStyle").fontSize
		? editor?.getAttributes("textStyle").fontSize.replace("px", "")
		: "16";
	const [fontSize, setFontSize] = useState(currentFontSize);
	const [inputValue, setInputValue] = useState(fontSize);
	const [isEditing, setIsEditing] = useState(false);

	function updateFontSize(newSize: string) {
		const size = parseInt(newSize);
		if (!isNaN(size) && size > 0) {
			editor?.chain().focus().setFontSize(`${size}px`).run();
			setFontSize(newSize);
			setInputValue(newSize);
			setIsEditing(false);
		}
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	function handleInputBlur() {
		updateFontSize(inputValue);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
			updateFontSize(inputValue);
			editor?.commands.focus();
		}
	}

	function increment() {
		const newSize = parseInt(fontSize) + 1;
		updateFontSize(newSize.toString());
	}

	function decrement() {
		const newSize = parseInt(fontSize) - 1;
		if (newSize > 0) {
			updateFontSize(newSize.toString());
		}
	}

	return(
      <div className="flex items-center gap-x-0.5">

         <button 
            className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden cursor-pointer'
            onClick={decrement}
         >
            <MinusIcon className="size-4 md:size-5"/>
         </button>

         {
            isEditing ? (
               <input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onBlur={handleInputBlur}
						onKeyDown={handleKeyDown} 
						className='h-7 w-10 text-sm border border-neutral-400 text-center rounded-md bg-transparent focus:outline-none focus:ring-0 cursor-pointer'
					/>
            ) : (
               <button
                  className='h-7 w-10 text-sm border border-neutral-400 text-center rounded-md bg-transparent cursor-text'
                  onClick={()=>{
                     setIsEditing(true);
                     setFontSize(currentFontSize)
                  }}
               >
                  {currentFontSize}
               </button>
            )
         }

			<button 
            className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden cursor-pointer'
            onClick={increment}
         >
            <PlusIcon className="size-4 md:size-5"/>
         </button>

      </div>
   )
};

export default FontSizeButton;
