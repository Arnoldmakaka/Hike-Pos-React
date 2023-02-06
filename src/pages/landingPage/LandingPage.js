import React from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {

	return (
		<div>
			langing page
			<Link to={"/login"}>login</Link>
		</div>
	)
}

export default LandingPage