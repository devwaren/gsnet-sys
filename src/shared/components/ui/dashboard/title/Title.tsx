type Props = {
	title: string;
	desc: string;
};

export default function Title({ title, desc }: Props) {
	return (
		<header className="space-y-1">
			<h2 className="text-2xl font-semibold tracking-tight text-gray-900">
				{title}
			</h2>

			<p className="text-sm leading-relaxed text-gray-500">{desc}</p>
		</header>
	);
}
