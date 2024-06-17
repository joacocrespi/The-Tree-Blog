import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Use method override

let posts = {
	title: '',
	body: '',
};

app.get("/", (req, res) => {
	res.render("index.ejs", { userPostT: posts.title, userPostB: posts.body });
});

app.get("/create", (req, res) => {
	res.render("pages/create.ejs");
});

app.post("/submit", (req, res) => {
	posts.title = req.body.postTitle;
	posts.body = req.body.postBody.replace(/\n/g, "<br>"); // Replace newlines with <br>
	res.redirect("/");
});

app.get("/update", (req, res) => {
  res.render("pages/update.ejs", { userPostT: posts.title, userPostB: posts.body });
});

app.patch("/update", (req, res) => {
	if (req.body.postTitle) {
		posts.title = req.body.postTitle;
	}
	if (req.body.postBody) {
		posts.body = req.body.postBody.replace(/\n/g, "<br>"); // Replace newlines with <br>
	}
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

