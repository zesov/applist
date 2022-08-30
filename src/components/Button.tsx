/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@/lib/twind.ts";
import { btn } from "@/lib/ui.ts";
import Icon, { Props as IconProps } from "@/components/Icon.tsx";
>>>>>>> 1278098 (Rebranded Paquet)

export type Props = {
	icon?: string;
	iconProps?: IconProps;
	brand?: boolean;
	fullWidth?: boolean;
	children?: string;
	outlined?: boolean;
	red?: boolean;
};

export default function Button(props: Props & JSX.IntrinsicElements["button"]) {
	return (
		<button
			{...props}
			class={tw`
				${!props.disabled && btn}
				rounded px-8 py-2 text-base
				${props.red ? "border-red-500" : "border-current"}
				
				${
				props.outlined
					? `bg-transparent border ${
						props.red ? "text-red-500" : "text-current"
					}`
					: `${props.red ? "bg-red-500" : "bg-primary"} text-white`
			}
				flex flex-row flex-nowrap gap-2 justify-center items-center
				
				${props.disabled ? "opacity-25 cursor-not-allowed" : ""}

				${props.fullWidth ? "w-full" : ""}
				${props.class || ""}
			`}
		>
			{props.icon &&
				(
					<Icon
						name={props.icon}
						width={18}
						height={18}
						inline
<<<<<<< HEAD
						class={!props.outlined ? "filter invert" : undefined}
						{...props.iconProps}
=======
>>>>>>> 1278098 (Rebranded Paquet)
					/>
				)}
			{props.children}
		</button>
	);
}
