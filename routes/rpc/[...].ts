import { RPCHandler } from "@orpc/server/fetch";
import { defineHandler } from "nitro/h3";
import { router } from "../../server/router";

const rpcHandler = new RPCHandler(router);

export default defineHandler(async (event) => {
	const { matched, response } = await rpcHandler.handle(event.req, {
		prefix: "/rpc",
		context: {},
	});

	if (matched)
		return response;
});
