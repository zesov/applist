import { Handler } from "@/types/Handler.ts";
import { getAppsRandom, getApp, getAppsByCategory } from "@/lib/db.ts";

const region = Deno.env.get("DENO_REGION") || "localhost";

export const handler: Handler = async (req) => {
	const url = new URL(req.url);
	const method = url.searchParams.get("method");
	if(method == 'getApp'){
		let id = url.searchParams.get("id");
		console.log(id);
		console.log(method);
		const app = await getApp(id? id:"");
		console.log(app);
		const otherApps = await getAppsRandom(5, app?.id);
		return new Response(JSON.stringify({app: app, otherApps: otherApps}),{
			headers: {"Access-Control-Allow-Origin": "*"}
		})
	}	
	if(method == 'getAppsByCategory'){
		let category = url.searchParams.get("category") || '0';
		let apps = []
		if(category == '0'){
			apps = await getAppsRandom(8);
		} else {
			apps = await getAppsByCategory(50, category);
		}
		return new Response(JSON.stringify(apps),{
			headers: {"Access-Control-Allow-Origin": "*"}
		})
	}
	return new Response("Hello World from " + region + "!\n") 

};
