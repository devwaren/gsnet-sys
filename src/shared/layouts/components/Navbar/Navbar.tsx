import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { useSession } from "#/shared/hooks";
import { styles } from "./styles";

export default function Navbar() {
	const { profile } = useSession();

	return (
		<header className={styles.header()}>
			<div className="flex-1"></div>
			<div className={styles.details()}>
				<Link
					to="/dashboard/settings"
					className="flex text-gray-400 hover:animate-spin"
				>
					<Settings />
				</Link>
				<div className={styles.profile.container()}>
					<img
						src={profile.avatar ?? ""}
						alt={profile.firstName}
						className={styles.profile.avatar()}
					/>
				</div>
			</div>
		</header>
	);
}
