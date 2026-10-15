import { ReactDevToolsDisabler } from "@dev-waren/react-devtool-disabler";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { styles } from "#/shared/styles";
import appCss from "../styles.css?url";

type RouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "GS Internet Sys" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "icon",
				type: "image/webp",
				href: "/gsnet.webp",
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
				<ReactDevToolsDisabler />
				{children}
				<Scripts />
			</body>
		</html>
	);
}
