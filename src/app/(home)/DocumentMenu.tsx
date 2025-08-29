import { ExternalLink, FilePenIcon, MoreVertical, Trash } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {} from "@radix-ui/react-dropdown-menu";
import RemoveDialog from "@/components/RemoveDialog";
import RenameDialog from "@/components/RenameDialog";


interface DocumentMenuProps {
	documentId: Id<"documents">;
	title: string;
	onNewTab: (id: Id<"documents">) => void;
}

const DocumentMenu = ({ documentId, title, onNewTab }: DocumentMenuProps) => {

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size='icon' className='rounded-full cursor-pointer'>
					<MoreVertical className='size-4' />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>

				<RenameDialog documentId={documentId} initialTitle={title}>
					<DropdownMenuItem onSelect={(e)=>e.preventDefault()} onClick={(e)=>e.stopPropagation()}>
						<FilePenIcon className="size-4 mr-1"/> Rename
					</DropdownMenuItem>
				</RenameDialog>

				<RemoveDialog documentId={documentId}>
					<DropdownMenuItem onSelect={(e)=>e.preventDefault()} onClick={(e)=>e.stopPropagation()}>
						<Trash className="size-4 mr-1"/> Remove
					</DropdownMenuItem>
				</RemoveDialog>

				<DropdownMenuItem
					onClick={() => onNewTab(documentId)}
					className='cursor-pointer'>
					<ExternalLink className='size-4' />
					Open in new tab
				</DropdownMenuItem>

			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DocumentMenu;
