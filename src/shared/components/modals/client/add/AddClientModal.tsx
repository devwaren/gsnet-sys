import { UserPlus } from "lucide-react";
import { AddClientForm } from "#/features/admin/clients/add";
import { FormBuilder } from "#/shared/components/builder/form";
import { CloseButton, SubmitButton } from "#/shared/components/buttons";
import { Modal } from "#/shared/layouts";
import { address, details, installation } from "./constants";

export function AddClientModal() {
	return (
		<Modal>
			<AddClientForm className="w-full space-y-6 rounded-2xl bg-white p-6">
				{/* Header */}
				<header className="space-y-3">
					<div className="flex items-start justify-between">
						<div className="flex size-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
							<UserPlus size={21} />
						</div>

						<CloseButton />
					</div>

					<div className="space-y-1">
						<h2 className="text-xl font-semibold tracking-tight text-gray-900">
							Add New Client
						</h2>

						<p className="text-sm leading-5 text-gray-500">
							Enter the client's information to register a new account.
						</p>
					</div>
				</header>

				{/* Form Sections */}
				<div className="grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 md:grid-cols-2">
					<div className="space-y-6">
						<section className="space-y-3">
							<h3 className="text-sm font-semibold text-gray-900">
								Customer Details
							</h3>

							<FormBuilder fields={details} />
						</section>

						<section className="space-y-3">
							<h3 className="text-sm font-semibold text-gray-900">Address</h3>

							<FormBuilder fields={address} />
						</section>
					</div>

					<section className="space-y-3">
						<h3 className="text-sm font-semibold text-gray-900">
							Installation Details
						</h3>

						<FormBuilder fields={installation} />
					</section>
				</div>
				<SubmitButton
					label="Register Client"
					loadinglabel="Registering Client..."
				/>
			</AddClientForm>
		</Modal>
	);
}
