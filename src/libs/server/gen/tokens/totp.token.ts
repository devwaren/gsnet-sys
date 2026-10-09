import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";

const ISSUER = "gs internet";

const createTotpEnrollment = async (email: string) => {
	const secret = generateSecret();

	const uri = generateURI({
		issuer: ISSUER,
		label: email,
		secret,
	});

	const qrCode = await QRCode.toDataURL(uri, {
		errorCorrectionLevel: "M",
		margin: 2,
		width: 280,
	});

	return { secret, uri, qrCode };
};

export { createTotpEnrollment };

export async function verifyTotp(secret: string, token: string) {
	if (!/^\d{6}$/.test(token)) {
		return false;
	}

	const result = await verify({
		secret,
		token,
	});

	return result.valid;
}
