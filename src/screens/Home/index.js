import React from "react";
import "./index.css";
import { useSelector } from "react-redux";

export default ({}) => {
	const store = useSelector((state) => state);
	console.log(store);
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<p>Hello Home page </p>
		</div>
	);
};
