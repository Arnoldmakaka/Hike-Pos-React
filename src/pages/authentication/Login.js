import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, Navigate, useNavigate  } from "react-router-dom";

const Login = () => {
	
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const _onLogin = async (e) => {
		e.preventDefault();
		if(email !== "" && password !== "") {
			navigate("/dashboard");
			return true
		}
		alert("Fill in inputs")
	}

	return (
		<section class="h-screen">
			<div class="px-6 h-full text-gray-800">
				<div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6" >
					<div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							class="w-full"
							alt="Sample image"
						/>
					</div>

					<div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

						<form onSubmit={_onLogin}>
							<div class="flex flex-row items-center justify-center lg:justify-start">
								<p class="text-lg mb-0 mr-4">Sign in with</p>
							</div>

							<div class="mb-6">
								<input
									type="text"
									class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="email"
									placeholder="Email address"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									required
								/>
							</div>

							<div class="mb-6">
								<input
									type="password"
									class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="password"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									required
								/>
							</div>

							<div class="flex justify-between items-center mb-6">
								<a href="#!" class="text-gray-800">Forgot password?</a>
							</div>

							<div class="text-center lg:text-left">
								<button type="submit" class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login</button>
							</div>
	        			</form>
	      			</div>
	    		</div>
	  		</div>
		</section>
	)
}

export default Login
