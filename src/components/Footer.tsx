import Container from "@/components/Container.tsx";

export default function Footer() {
	return (
		<footer class="my-8 text-center">
			<Container>
				<a
					href="mailto:baich.info@gmail.com" target="_blank" rel="noopener noreferrer"
					class="hover:underline opacity-75 text-center"
				>
					Got issues? Reach us here
				</a>
			</Container>
		</footer>
	);
}
