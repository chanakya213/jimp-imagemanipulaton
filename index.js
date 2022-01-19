const express = require("express");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// const { Canvas } = require("canvas-constructor");
// const canvas = require("canvas");
const jimp = require("jimp");

app.get('/', (req, res) => {
    res.render("certificate");
});

// app.post('/certificate', async(req , res)=>{

//      const img = await canvas.loadImage("/image.png");

//      let image = new Canvas(676 ,1188)
//      .printImage(img,0,0,676,1188)
//     .setTextFont("28px impact")
//     .printText(req.body.name,240,580)
//     .printText(req.body.date,240,800)
//     .printText(req.body.certificatenumber,120,800)
//     .printText("React Frontend Developer",280,800)
//     .toBuffer();
//     res.set({"Content-type" : "image/png"})
//     res.send(image)
// });


app.post('/certificate', async(req , res)=>{

    const image = await jimp.read(__dirname+"/public/image.png");

    const font = await jimp.loadFont(jimp.FONT_SANS_16_BLACK)
    const font1 = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)

   image.print(font1,490,200, req.body.name)
   image.print(font,580,560, req.body.date)
   image.print(font ,270,560, req.body.certificatenumber)
   image.print(font1 ,420,350, "React Frontend Developer")

   image.write(__dirname+"/public/edited-image.png")
   res.send("certificate generated successfully");

});

app.listen(4000, function() {
    console.log("Server started on port 4000");
});