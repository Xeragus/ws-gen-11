module.exports = () => {

const path = require('path')
const mailgun = require("mailgun-js");
const DOMAIN = "";
const mg = mailgun({apiKey: "", domain: DOMAIN});

var filepath = path.join(__dirname, './output.pdf')

const data = {
	from: "",
	to: "",
	subject:'Congratulations!',
	text:'Hello there! You have successfully created a blog post!',
	html: `<h1>Ws Gen 11</h1><h3>Ws Gen 11</h3>`,
	attachment: filepath
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});

}