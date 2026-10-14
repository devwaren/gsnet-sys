import { Mapper } from "@dev-waren/react-form-kit";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { useSidebarStore } from "#/shared/store/sidebar";
import { styles } from "./styles";

type Items = {
	link: string;
	exact?: boolean;
	icon: LucideIcon;
	label: string;
};

type Props = {
	links: Items[];
};

export default function NavLinks({ links }: Props) {
	const { closeSidebar } = useSidebarStore();

	return (
		<Mapper
			listFor="navigation links"
			items={links}
			className={styles.container()}
		>
			{(item) => (
				<Link
					to={item.link}
					activeProps={{
						className: styles.activeLinks(),
					}}
					activeOptions={{ exact: item.exact ?? false }}
					className={styles.links()}
					onClick={closeSidebar}
				>
					<item.icon size={18} />
					<span>{item.label}</span>
				</Link>
			)}
		</Mapper>
	);
}
