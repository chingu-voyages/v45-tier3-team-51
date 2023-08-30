// 'use client';
import { getBaseUrl } from '@/lib/server/getBaseUrl';
import { CopyButton, Button } from '@mantine/core';
import { usePathname } from 'next/navigation';

export function CopyLink() {
	const baseUrl = getBaseUrl();
	const path = usePathname();
	const shareLink = baseUrl + path;
	console.log(shareLink);

	return (
		<div className='flex items-center justify-between border-2 border-black rounded-md py-2'>
			{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"> */}
			<div className='pl-3'>{shareLink}</div>
			<CopyButton value={shareLink}>
				{({ copied, copy }: any) => (
					<Button color={copied ? 'teal' : 'blue'} onClick={copy} variant='white' className='px-3 text-lg'>
						{copied ? 'Copy' : 'Copy'}
					</Button>
				)}
			</CopyButton>
		</div>
	);
}
