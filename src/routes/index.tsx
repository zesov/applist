import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Icon from "@/components/Icon.tsx";
import Button from "@/components/Button.tsx";
import Card from "@/components/Card.tsx";
import Input from "@/components/Input.tsx";
import Textarea from "@/components/Textarea.tsx";
import Divider from "@/components/Divider.tsx";
import ListItem from "@/components/ListItem.tsx";
import Features from "@/components/compound/Features.tsx";
import { APP } from "@/lib/app.ts";
import { getAppsRandom } from "@/lib/db.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { defineRoute } from "$fresh/server.ts";
import type { SignedInState } from "@/plugins/session.ts";
import { redirect } from "@/utils/http.ts";
import {
	getStripePremiumPlanPriceId,
	isStripeEnabled,
	stripe,
  } from "@/utils/stripe.ts";

export const handler: Handlers = {
	async POST(req, ctx) {
	  // buy $1
	  if (!isStripeEnabled()) return ctx.renderNotFound();
	  const stripePremiumPlanPriceId = getStripePremiumPlanPriceId();
	  if (stripePremiumPlanPriceId === undefined) {
		throw new Error(
		  '"STRIPE_PREMIUM_PLAN_PRICE_ID" environment variable not set',
		);
	  }
	  const { url } = await stripe.checkout.sessions.create({
		success_url: ctx.url.origin + "/",
		line_items: [
		  {
			price: stripePremiumPlanPriceId,
			quantity: 1,
		  },
		],
		mode: "payment",
	  });
	  if (url === null) return ctx.renderNotFound();	  

	  const formData = await req.formData();
	  const to = formData.get("to");
	  if(!to){
		throw new Error("to is required");
	  }
	  const subject = formData.get("subject");
	  const body = formData.get("body");
	  // SMTP 服务器设置
	  const client = new SmtpClient();
	  await client.connectTLS({
		hostname: "smtp.feishu.cn",
		port: 465,
		username: "postmaster@appnxt.com",
		password: "JrFJLgxOiQTcrJ5q",
	  });
	  await client.send({
		from: "postmaster@appnxt.com",
		to: to.toString(),
		subject: subject.toString(),
		content: body.toString(),
	  });
	  await client.close();

		// return new Response("Email sent successfully!");
	return redirect(url);
	},
};
export default async function Welcome(req: Request) {
	const url = new URL(req.url);

	if (
		url.searchParams.get("utm_source") === "homescreen" ||
		url.searchParams.get("utm_source") === "pwa"
	) {
		return new Response("", {
			status: 307,
			headers: {
				"Location": "/home?utm_source=homescreen",
			},
		});
	}

	const apps = await getAppsRandom(8);

	return (
		<>
			<Head>
				<title>Send Special Emails</title>
			</Head>
			<Container class="flex flex-col h-screen justify-center relative">
				<div
					class="text-7xl font-bold"
				>
					Send anyonymous emails{" "}
					<span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">
						to your ...
					</span>
				</div>
				<p class="self-center text-center opacity-50 font-medium absolute bottom-4 animate-bounce">
					Interested? Scroll down to do it.<br />
					<Icon
						name="arrow-big-down-line"
						inline
					/>
				</p>
			</Container>
			<Container>
				<Card class="p-8 md:p-16">
					<Stack>
						<h2 class="text-5xl font-bold">
							Beautiful. <br />
							Funny. <br />
							Cute. <br />
							Just{" "}
							<span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">
								send it
							</span>.
						</h2>
						<div class="gap-2 place-items-center place-content-center filter grayscale">
							<form method="POST">
							<h2 class="text-5xl font-bold">
								<Input type="email" name="to" placeholder="To" required /> <span class="gap-2"/>
								<Input type="text" name="subject" placeholder="Subject" required />
							</h2>
								<Textarea rows="5" style="width:100%;" name="body" placeholder="Body" required></Textarea> <br/>
								<button class="btn-primary relative rounded px-8 py-2 text-base" type="submit">Send Email $1</button>
							</form>
						</div>
					</Stack>
				</Card>

			</Container>
		</>
	);
}
