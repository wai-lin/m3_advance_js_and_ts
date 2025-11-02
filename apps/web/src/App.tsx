import { SetupQueryClient } from "./lib/QueryClient";
import { Routes } from "./routes";

function App() {
	return (
		<SetupQueryClient>
			<Routes />
		</SetupQueryClient>
	);
}

export default App;
