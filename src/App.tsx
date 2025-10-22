import type { Component } from "solid-js";

export const App: Component = () => {
	const [count, setCount] = createSignal(0);

	return (
		<div>
			<h1>Hello</h1>
			<button
				onClick={() => setCount(c => c + 1)}
				class="btn"
			>
				Count:
				{" "}
				{count()}
			</button>
			<TextEditor />
		</div>
	);
};
