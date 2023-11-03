const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./utility/database');
const bodyparser = require('body-parser');
const Receipt = require('./models/receipts');
const Season = require('./models/seasons');
const nodeMailer = require('nodemailer');
const Vonage = require('@vonage/server-sdk');

let tranporter = nodeMailer.createTransport({
    service:'outlook',
    auth: {
        user: 'ali.333.deniz@outlook.com',
        pass: '(Bn=E4m7L$vP#Zf',
    }
});

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyparser.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    Season.findAll()
        .then((seasons)=>{
            Receipt.findAll()
                .then((receipts) => {
                    let genelAdet = 0 ;
                    let genelSafi = 0 ;
                    let genelBakiye = 0 ;
                    let countOfReceipts = receipts.length;

                    for( let i = 0 ; i < receipts.length ; i++){
                        let totalAdet = parseFloat(receipts[i].totalAdet);
                        let totalSafi = parseFloat(receipts[i].totalSafi);
                        let totalTutar = parseFloat(receipts[i].totalTutar);
                        genelAdet = genelAdet + totalAdet;
                        genelSafi = genelSafi + totalSafi;
                        genelBakiye = genelBakiye + totalTutar;
                    }
                    let ortalamaSafi = genelSafi/genelAdet;
                    let ortalamaTutar = genelBakiye/genelAdet;
                    let ortalamaFiyat = genelBakiye/genelSafi;

                    receipts.sort((a, b) => new Date(b.date) - new Date(a.date));

                    res.render('index/mainPage', {
                        seasons:seasons,
                        receipts:receipts,
                        countOfReceipts:countOfReceipts,
                        genelAdet:genelAdet,
                        genelBakiye:genelBakiye.toFixed(2),
                        genelSafi:genelSafi.toFixed(2),
                        ortalamaSafi:ortalamaSafi.toFixed(2),
                        ortalamaTutar:ortalamaTutar.toFixed(2),
                        ortalamaFiyat:ortalamaFiyat.toFixed(2)
                    });
                })
                .catch((err)=>{console.log(err)});
        })
        .catch((err)=>{console.log(err)})
})
app.post('/', (req, res) => {
    let seasonId = req.body.seasonId;
    if(seasonId == 'allOffThem'){
        res.redirect('/');
    }else{
        Season.findAll()
        .then((seasons)=>{
            Receipt.findAll({where: { seasonId: seasonId}})
                .then((receipts) => {
                    Season.findAll({ where: {id:seasonId}})
                        .then((season=>{
                            let genelAdet = 0 ;
                            let genelSafi = 0 ;
                            let genelBakiye = 0 ;
                            let countOfReceipts = receipts.length;

                            for( let i = 0 ; i < receipts.length ; i++){
                                let totalAdet = parseFloat(receipts[i].totalAdet);
                                let totalSafi = parseFloat(receipts[i].totalSafi);
                                let totalTutar = parseFloat(receipts[i].totalTutar);
                                genelAdet = genelAdet + totalAdet;
                                genelSafi = genelSafi + totalSafi;
                                genelBakiye = genelBakiye + totalTutar;
                            }
                            let ortalamaSafi = genelSafi/genelAdet;
                            let ortalamaTutar = genelBakiye/genelAdet;
                            let ortalamaFiyat = genelBakiye/genelSafi;

                            receipts.sort((a, b) => new Date(b.date) - new Date(a.date));

                            res.render('index/mainPage', {
                                seasonId:seasonId,
                                sezon:season[0].name,
                                seasons:seasons,
                                receipts:receipts,
                                countOfReceipts:countOfReceipts,
                                genelAdet:genelAdet,
                                genelBakiye:genelBakiye.toFixed(2),
                                genelSafi:genelSafi.toFixed(2),
                                ortalamaSafi:ortalamaSafi.toFixed(2),
                                ortalamaTutar:ortalamaTutar.toFixed(2),
                                ortalamaFiyat:ortalamaFiyat.toFixed(2)
                            });
                        }))
                        .catch((err)=>{console.log(err)})
                })
                .catch((err)=>{console.log(err)});
        })
        .catch((err)=>{console.log(err)})
    }
    
})
app.get('/addingNewReceipt', (req, res)=>{
    Receipt.findAll()
        .then((receipts)=>{
            Season.findAll()
                .then((seasons) => {
                    let genelAdet = 0 ;
                    let genelSafi = 0 ;
                    let genelBakiye = 0 ;
    
                    for( let i = 0 ; i < receipts.length ; i++){
                        let totalAdet = parseFloat(receipts[i].totalAdet);
                        let totalSafi = parseFloat(receipts[i].totalSafi);
                        let totalTutar = parseFloat(receipts[i].totalTutar);
                        genelAdet = genelAdet + totalAdet;
                        genelSafi = genelSafi + totalSafi;
                        genelBakiye = genelBakiye + totalTutar;
                    }
    
                    let ortalamaSafi = genelSafi/genelAdet;
                    let ortalamaTutar = genelBakiye/genelAdet;
                    let ortalamaFiyat = genelBakiye/genelSafi;

                    res.render('index/addingNemReceipt', {
                        seasons:seasons,
                        genelAdet:genelAdet,
                        genelBakiye:genelBakiye.toFixed(2),
                        genelSafi:genelSafi.toFixed(2),
                        ortalamaSafi:ortalamaSafi.toFixed(2),
                        ortalamaTutar:ortalamaTutar.toFixed(2),
                        ortalamaFiyat:ortalamaFiyat.toFixed(2)
                    });
                })
                .catch((err)=>{console.log(err)});

            
        })
        .catch((err)=>{console.log(err)})
})
app.post('/addingNewReceipt', (req, res)=>{
    text = 'Receipt added successfully';
    let seasonId = req.body.seasonId;
    let receiptOwner = req.body.receiptOwner;
    let receiptDate = req.body.receiptDate;
    let malBirName = req.body.malBirName;
    let malBirAdet = req.body.malBirAdet;
    let malBirSafi = req.body.malBirSafi;
    let malBirFiyat = req.body.malBirFiyat;
    let malBirTutar = req.body.malBirTutar;
    let malIkiName = req.body.malIkiName;
    let malIkiAdet = req.body.malIkiAdet;
    let malIkiSafi = req.body.malIkiSafi;
    let malIkiFiyat = req.body.malIkiFiyat;
    let malIkiTutar = req.body.malIkiTutar;
    let malUcName = req.body.malUcName;
    let malUcAdet = req.body.malUcAdet;
    let malUcSafi = req.body.malUcSafi;
    let malUcFiyat = req.body.malUcFiyat;
    let malUcTutar = req.body.malUcTutar;
    let totalAdet = req.body.totalAdet;
    let totalSafi = req.body.totalSafi;
    let totalTutar = req.body.totalTutar;

    let ortalamaSafi = totalSafi / totalAdet;
    let ortalamaTutar = totalTutar / totalAdet;

    let mailOptions = {
        from: 'ali.333.deniz@outlook.com',
        to: 'ali.3335.deniz@gmail.com',
        subject: 'nodemailer test',
        html: 
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="card">
                <div class="card-header d-flex justify-content-center align-items-center">
                    <div class="name">${receiptOwner}</div>
                    <div class="date">${receiptDate}</div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tarih</th>
                                <th>Mal Adı</th>
                                <th>Adet</th>
                                <th>Safi</th>
                                <th>Fiyat</th>
                                <th>Tutar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${receiptDate}</td>
                                <td>${malBirName}</td>
                                <td>${malBirAdet}</td>
                                <td>${malBirSafi}</td>
                                <td>${parseFloat(malBirFiyat).toFixed(2)}</td>
                                <td>${parseFloat(malBirTutar).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>${receiptDate}</td>
                                <td>${malIkiName}</td>
                                <td>${malIkiAdet}</td>
                                <td>${malIkiSafi}</td>
                                <td>${parseFloat(malIkiFiyat).toFixed(2)}</td>
                                <td>${parseFloat(malIkiTutar).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>${receiptDate}</td>
                                <td>${malUcName}</td>
                                <td>${malUcAdet}</td>
                                <td>${malUcSafi}</td>
                                <td>${parseFloat(malUcFiyat).toFixed(2)}</td>
                                <td>${parseFloat(malUcTutar).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td class="border-bottom-0" colspan="2"></td>
                                <td class="border-bottom-0">${totalAdet}</td>
                                <td class="border-bottom-0" colspan="2">${totalSafi}</td>
                                <td class="border-bottom-0">${parseFloat(totalTutar).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="fard-footer">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th>Ortalama Safi</th>
                                <td>${ortalamaSafi.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th class="border-bottom-0">Ortalama Tutar</th>
                                <td class="border-bottom-0">${ortalamaTutar.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
        `
    };

    Receipt.create({
        seasonId:seasonId,
        name:receiptOwner,
        date:receiptDate,
        malBirName:malBirName,
        malBirAdet:malBirAdet,
        malBirSafi:malBirSafi,
        malBirFiyat:malBirFiyat,
        malBirTutar:malBirTutar,
        malIkiName:malIkiName,
        malIkiAdet:malIkiAdet,
        malIkiSafi:malIkiSafi,
        malIkiFiyat:malIkiFiyat,
        malIkiTutar:malIkiTutar,
        malUcName:malUcName,
        malUcAdet:malUcAdet,
        malUcSafi:malUcSafi,
        malUcFiyat:malUcFiyat,
        malUcTutar:malUcTutar,
        totalAdet:totalAdet,
        totalSafi:totalSafi,
        totalTutar:totalTutar,
        ortalamaSafi:ortalamaSafi,
        ortalamaTutar:ortalamaTutar,
    })
    .then(()=>{
        res.redirect('/addingNewReceipt');
        tranporter.sendMail(mailOptions,(err,data)=>{
            if(err){
                console.log(err);
            }else{
                console.log('mail gönderildi');
            }
        });
    })
    .catch((err)=>{console.log(err)})
});
app.post('/deleteReceipt', (req, res)=>{
    const id = req.body.receiptId;

    Receipt.destroy({where:{id:id}})
        .then(()=>{
            res.redirect('/');
        }).catch((err)=>{console.log(err);});
});
app.get('/addingNewSeason', (req,res) => {
    res.render('index/addingNewSeason');
})
app.post('/addingNewSeason', (req, res) => {
    let seasonName = req.body.seasonName;

    Season.create({name:seasonName})
        .then(()=>{res.redirect('/')})
        .catch((err)=>{console.log(err)})
})
Receipt.belongsTo(Season);
Season.hasMany(Receipt);
sequelize
    //.sync({ force: true })
    .sync()
    .then(()=>{
        app.listen('3000', ()=> {
            console.log('listening port on 3000!');
        })
    })
    .catch((err)=>{console.log(err)})