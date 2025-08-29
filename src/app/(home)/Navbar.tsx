import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import {UserButton, OrganizationSwitcher} from '@clerk/nextjs'

const Navbar = () => {
	return (
		<nav className='flex items-center justify-between h-full w-full'>

			<section className='flex gap-3 items-center shrink-0 pr-6'>
				<Link href='/'>
					<Image src='/favicon.svg' alt='logo' width={30} height={30} />
				</Link>
				<h3 className='text-xl'>Docs</h3>
			</section>

         <SearchInput/>

         <div className="flex gap-3 items-center pl-6">
				<OrganizationSwitcher
					afterCreateOrganizationUrl="/"
					afterLeaveOrganizationUrl="/"
					afterSelectOrganizationUrl="/"
					afterSelectPersonalUrl="/"
				/>
				<UserButton/>
			</div>

		</nav>
	);
};

export default Navbar;
