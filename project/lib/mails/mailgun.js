const mailgun = require("mailgun-js");
const DOMAIN = "sandboxcffb12f8eac947a0ade4e913fe7d90ef.mailgun.org";
const mg = mailgun({apiKey: "b630707a3436d04ab7be98aa7c8eb826-6ae2ecad-8193391d", domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandboxcffb12f8eac947a0ade4e913fe7d90ef.mailgun.org>",
	to: "goki_bituse@hotmail.com",
	subject: "Vlada na RM",
	text: "Go sakam TENDER vo postensko sandace"
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});