const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");
////////////////////////
//Files

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const hello = "Hello Node anna";
// console.log(hello);
// console.log(textIn);
// const textOut = `This is what we now about the Avacado fruit:${textIn}.\nCreated at ${Date.now()}`;
// fs.writeFileSync("./txt/Output.txt", textOut);
// console.log("File Created");

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//     if(err) return console.log("Error 💥")
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/final.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your file has been written");
//         }
//       );
//     });
//   });
// });
// console.log("Will read file!");

///////////////////
///Server
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/, product.productName);
  output = output.replace(/{%IMAGE%}/, product.image);
  output = output.replace(/{%PRICE%}/, product.price);
  output = output.replace(/{%FROM%}/, product.from);
  output = output.replace(/{%NUTRIENTS%}/, product.nutrients);
  output = output.replace(/{%QUANTITY%}/, product.quantity);
  output = output.replace(/{%ID%}/, product.id);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  output = output.replace(/{%DESCRIPTION%}/, product.description);
  return output;
};

///Reading the file Synchronously to avoid lot of APi call by doing this way  we already getting the data and storeing i a variable and we can just use how many times we want😁

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf8"
);
const tempCards = fs.readFileSync(
  `${__dirname}/templates/template-cards.html`,
  "utf8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  //Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCards, el))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHtml);
    res.end(output);
  }
  //Product Page
  else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }
  //API Page
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello Node Server",
    });
    res.end("<h1>Page not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});
