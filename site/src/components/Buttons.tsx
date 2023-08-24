'use client';

import { Button } from '@mantine/core';

interface ButtonProps {
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	text: string;
	onClick?: () => void;
}

export function Buttons({ size, text, onClick }: ButtonProps) {
	return (
		<Button variant='outline' radius='lg' size={size} onClick={onClick}>
			{text}
		</Button>
	);
}
