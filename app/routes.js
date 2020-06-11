module.exports = function(app, streams) {
    let path = require('path');
    let fs = require('fs');
    // GET home 
    var addressList = {};
    let p = new Promise(function(resolve, reject) {
        //做一些异步操作

        fs.readFile(path.join(__dirname, 'user.json'), { encoding: 'utf-8' }, function(err, data) {
            /* console.log(data); */
            /* console.log(data); */
            resolve(JSON.parse(data));
        });

    });
    p.then(function(data) {
            addressList = data;
        })
        /* {
            
            "父亲": 13488408464,
            "母亲": 13891041773
        } */
    var result = {
        name: '陌生人'
    };
    var index = function(req, res) {

        res.render('index', {
            title: 'Project RTC',
            header: 'WebRTC live streaming',
            username: 'Username',
            share: 'Share this link',
            footer: 'pierre@chabardes.net',
            id: req.params.id,
            caller: result.name
        });
    };

    // GET streams as JSON
    var displayStreams = function(req, res) {
        var streamList = streams.getStreams();
        // JSON exploit to clone streamList.public
        var data = (JSON.parse(JSON.stringify(streamList)));

        res.status(200).json(data);
    };


    app.post('/addUser', function(req, res) {
        var arrs = Object.keys(addressList);
        for (let key of arrs) {
            if (addressList[key] == req.body.number) {
                res.send("faile");
                return;
            }
        }
        addressList[req.body.username] = req.body.number;
        console.log(addressList);
        fs.writeFile(path.join(__dirname, 'user.json'), JSON.stringify(addressList), function(error) {})

        res.send("sucess");
        return;
    })
    app.post('/username', function(req, res) {
        var user = req.body.username;
        var mid = {};
        console.log(user);
        /*  console.log(mid); */
        var arrays = Object.keys(addressList);
        let p = new Promise(function(resolve, reject) {
            //做一些异步操作

            fs.readFile(path.join(__dirname, 'user.json'), { encoding: 'utf-8' }, function(err, data) {
                /* console.log(data); */
                /* console.log(data); */
                resolve(data);
            });

        });
        p.then(function(data) {
            mid = JSON.parse(data);
            let arrays = Object.keys(mid);
            for (let key of arrays) {
                if (parseInt(mid[key]) == user) {
                    result.name = key;
                    return;
                }
            }
            result.name = "陌生人";
            res.end("访问成功");
        })


    })

    app.get('/addresslist', function(req, res) {
        console.log(addressList)
        res.send(addressList);
    })
    app.post('/deleteUser', function(req, res) {

        console.log(req.body);
        for (let key in addressList) {
            if (addressList[key] == req.body.number) {
                delete addressList[key];
                fs.writeFile(path.join(__dirname, 'user.json'), JSON.stringify(addressList), function(error) {})
                res.send("1");
            }
        }
        res.send("0");

    })
    app.get('/streams.json', displayStreams);
    app.get('/', index);
    app.get('/:id', index);

}