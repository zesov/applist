import Button from "@/components/Button.tsx";
import { AuthMethodsList, AuthProviderInfo } from "pocketbase-types";
import { AuthMethodNames } from "@/lib/pocketbase-client.ts";

interface Props {
	authMethods: AuthMethodsList;
	origin: string;
}

export default function LoginButtons(props: Props) {
	const redirectUrl = `${props.origin}/auth/callback`;

	const login = (provider: AuthProviderInfo) => {
		sessionStorage.setItem("provider", JSON.stringify(provider));
	}

	return (
		<>
			{props.authMethods.authProviders.map(provider => (
				<a
					href={provider.authUrl + redirectUrl}
					onClick={() => login(provider)}
				>
					<Button
						icon={provider.name}
						fullWidth
					>
						Login with {AuthMethodNames.get(provider.name)}
					</Button>
				</a>
			))}
		</>
	);
}