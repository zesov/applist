import "dotenv";

export const APP = {
	version: "2.0.5",
	codename: "Bianca",
};

export const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");
