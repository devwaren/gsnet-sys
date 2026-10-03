import { z } from "@dev-waren/react-form-kit";

export const email = z.string().email({ message: "email is required" });
