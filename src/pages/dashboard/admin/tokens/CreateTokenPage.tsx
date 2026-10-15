import { InviteTokenForm } from "#/features/admin/token";
import { FormBuilder } from "#/shared/components/builder/form";
import { SubmitButton } from "#/shared/components/buttons";
import { Title } from "#/shared/components/ui/dashboard";
import { fields } from "./constants";

export default function CreateTokenPage() {
	return (
		<div className="min-h-full space-y-6 bg-gray-50 p-4 sm:p-6 lg:p-8">
			<Title
				title="Create Registration Token"
				desc="Create a registration token to invite users to register."
			/>

			<div className="mx-auto w-full max-w-2xl">
				<InviteTokenForm className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
					<div className="space-y-1">
						<h2 className="text-lg font-semibold text-gray-800">
							Invite Token Registration Form
						</h2>
						<p className="text-sm text-gray-500">
							Configure the registration token using the fields below.
						</p>
					</div>

					<FormBuilder fields={fields} />

					<div className="flex justify-end border-t border-gray-100 pt-4">
						<SubmitButton loadinglabel="Submitting" label="Create Token" />
					</div>
				</InviteTokenForm>
			</div>
		</div>
	);
}
