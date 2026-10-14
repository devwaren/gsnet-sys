import type { FormField } from "#/shared/types";

export const details: FormField[] = [
	{
		name: "firstName",
		placeholder: "Enter first name",
		className: "capitalize",
		type: "text",
	},
	{
		name: "lastName",
		placeholder: "Enter last name",
		className: "capitalize",
		type: "text",
	},
	{
		name: "email",
		placeholder: "Enter email address",
		type: "email",
	},
	{
		name: "phone",
		placeholder: "Enter phone number",
		type: "text",
	},
];

export const address: FormField[] = [
	{
		name: "address.zipCode",
		placeholder: "Enter ZIP code",
		type: "text",
	},
	{
		name: "address.unit",
		placeholder: "Enter unit/block",
		type: "text",
	},
	{
		name: "address.barangay",
		placeholder: "Enter barangay",
		className: "capitalize col-span-2",
		type: "text",
	},
	{
		name: "address.city",
		placeholder: "Enter city",
		className: "capitalize",
		type: "text",
	},
	{
		name: "address.country",
		placeholder: "Enter country",
		className: "capitalize",
		type: "text",
	},
];

export const installation: FormField[] = [
	{
		name: "installation.plan",
		placeholder: "Select an internet plan",
		className: "rounded-md border border-gray-300",
		type: "select",
		items: [
			{ label: "15 Mbps Plan", value: "plan-15mbps" },
			{ label: "30 Mbps Plan", value: "plan-30mbps" },
			{ label: "50 Mbps Plan", value: "plan-50mbps" },
		],
	},
	{
		name: "installation.installer",
		placeholder: "Select installer",
		className: "rounded-md border border-gray-300",
		type: "select",
		items: [
			{ label: "Rey Pineda", value: "rey pineda" },
			{ label: "Levi Gayanes", value: "levi gayanes" },
		],
	},
	{
		name: "installation.date",
		type: "date",
	},
];
