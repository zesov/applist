/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Card from "@/components/Card.tsx";

export default function About() {
	return (
		<>
			<Navbar
				back
			/>
			<Container>
				<Stack>
					<Header
						icon="info"
					>
						About Paquet
					</Header>
					<p>
						Paquet(french for "package") is an alternative app store
						for your device. Paquet is a web app shop where you can
						find and install web apps.
					</p>
					<ul class={tw`list-outside list-disc pl-4`}>
						<li>No UI framework overhead</li>
						<li>Deployed on the edge in over 30 regions</li>
						<li>Built with Deno and Fresh for performance</li>
						<li>No tracking</li>
						<li>Supabase backend for a better database</li>
						<li>Security is a top priority</li>
						<li>Easy to contribute to</li>
					</ul>
					<img
						src="/illustrations/app-installation.svg"
						class={tw`h-64`}
					/>
					<p>
						Web apps have multiple advantages over native apps:
					</p>
					<ul class={tw`list-outside list-disc pl-4`}>
						<li>
							Most of the time, they are open source.
						</li>
						<li>
							They don't take up space on your device.
						</li>
						<li>
							They install quickly.
						</li>
						<li>
							No need to worry about updates.
						</li>
						<li>
							Web apps work on any device with a web browser.
						</li>
					</ul>
					<Card>
						<p>
							<span
								class={tw`material-symbols-outlined !text-base !align-bottom`}
							>
								info
							</span>{" "}
							Web apps are meant to complement native apps, not
							replace them. Use a web app when you don't use a
							service often or if you use a low-end device.
						</p>
						<br />
						<p>
							Sometimes a native app would be better than a web
							app.
						</p>
					</Card>
					<img
						src="/illustrations/progressive-app.svg"
						class={tw`h-64`}
					/>
				</Stack>
			</Container>
		</>
	);
}