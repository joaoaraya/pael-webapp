'use client'

import { ReactNode, useState } from 'react'
import NavSidebar from '@/components/nav/NavSidebar'

type OpenSidebar = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    children: ReactNode;
    sidebarContent: ReactNode;
}

export default function OpenSidebar(props: OpenSidebar) {
	const [showSidebar, setShowSidebar] = useState(false)

	const Tag = props.tagType //Tag Dinâmica (button, div, tr..)

	return (
		<>
			<Tag onClick={() => setShowSidebar(true)} className={props.className}>
				{props.children}
			</Tag>

			{showSidebar && (
				<NavSidebar
					showSidebar={showSidebar}
					closeButton={() => setShowSidebar(false)}
				>
					{props.sidebarContent}
				</NavSidebar>
			)}
		</>
	)
}
