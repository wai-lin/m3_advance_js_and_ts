import type { RouterClient } from "@orpc/server";
import type { router } from "../../server/router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { getRequestEvent } from "solid-js/web";

const link = new RPCLink({
	url: () => {
		if (typeof window === "undefined")
			throw new TypeError("RPCLink is not allowed on the server side.");
		return `${window.location.origin}/rpc`;
	},
	headers: () => getRequestEvent()?.request.headers ?? {},
});
export const rpcClient: RouterClient<typeof router> = createORPCClient(link);
export const rpc = createTanstackQueryUtils(rpcClient);
