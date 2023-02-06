import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";

const MainLayout = () => {

	const [showSidebar, setShowSidebar] = useState(false);
	const params = new URLSearchParams(document.location.search);
	console.log('mainparams', params.get('code'))

	
	return (
		<div className="flex h-screen bg-gray-200">
			<aside className={`${showSidebar ? 'block' : 'hidden' } md:block bg-white w-64 p-6`} >
				Sidebar Content
			</aside>

			<main className="flex-1 p-6">
				<header className="flex items-center">
					
				</header>
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout