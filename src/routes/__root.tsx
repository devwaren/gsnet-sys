import type { QueryClientProviderProps } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { styles } from "#/shared/styles";
import appCss from "../styles.css?url";

type ContextProps = QueryClientProviderProps["client"];

export const Route = createRootRouteWithContext<ContextProps>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "GS Internet Sys",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

type Props = ComponentProps<"html">;

function RootDocument({ children }: Props) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className={styles.root()}>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
