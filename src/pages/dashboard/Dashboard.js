import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useSearchParams  } from 'react-router-dom';
import axios from 'axios';
import  useOAuth from '../../customHooks/useOAuth';

const Dashboard = () => {

	const params = new URLSearchParams(document.location.search);

	let { loading, getAuth } = useOAuth({
		authorizeUrl: "https://api.hikeup.com/oauth/authorize",
		clientId: 'Hike-Online-Shop-00a29c4789',
		redirectUri: 'http://localhost:3001/oauth-callback',
		scope: 'all'
	});

	const getProducts = async (e) => {
		e.preventDefault();
		getAuth()
	}
	
	return (
		<div>
			Dashboard

			<button onClick={getProducts} class="inline-block mx-4 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Get Products</button>
		</div>
	)
}

export default Dashboard