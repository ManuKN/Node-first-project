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
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello from the Overview!");
  } else if (pathName === "/product") {
    res.end("This is the Product!");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello Node Server",
    });
    res.end('<h1>Page not Found</h1>');
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});
