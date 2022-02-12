import express from "express";
import bodyParser from 'body-parser';
import productRoutes from "./handlers/product";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Deployed from EB CLI!");
});

productRoutes(app);

app.listen(port, ()=>{
    console.log(`Starting app on port ${port}`);
});

export default app;