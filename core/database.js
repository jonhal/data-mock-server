const firebase = require('firebase');
const mongodb = require('mongodb');
const config = require('../config');
const database = config.dataBaseName;
const url = config.dataBaseUrl + '/' + database; 
module.exports = {
    get: (key, success, err) => (
        mongodb.connect(url, function(err, db) {
            if (err) {
                err();
                throw err
            };
            var dbo = db.db(database);
            var whereStr = {name:key};  // 查询条件
            dbo.collection(database).find(whereStr).toArray(function(err, result) {
                if (err) {
                    err();
                    throw err
                } else {
                    console.log(result.length)
                    if (!result.length) {
                        return false;
                    }
                    // if (result[0].value.result) {
                        success(result[0].value)
                    // }
                    console.log(result[0].value);
                }
                db.close();
            });
        })
    ),
    post: (key, data, success, err) => {
        mongodb.connect(url, function(err, db) {
            if (err) {
                // err();
                throw err
            };
            var dbo = db.db(database);
            var myobj = { name: key, value: data };
            // console.log(data);
            var whereStr = {name: key};
            dbo.collection(database).find(whereStr).toArray(function(err, result) {
                if (err) {
                    err();
                    throw err
                }else {
                    if (result.length) {
                        dbo.collection(database).findOneAndUpdate(whereStr,{ $set: myobj} ,function(err, res) {
                            if (err) {
                                err();
                                throw err
                            } else {
                                success("文档更新成功");
                                console.log("文档更新成功");
                            }
                            db.close();
                        });
                    } else {
                        dbo.collection(database).insertOne(myobj, function(err, res) {
                            if (err) {
                                // err();
                                throw err
                            }else {
                                success("文档插入成功");
                                console.log("文档插入成功");
                            }
                            db.close();
                        });
                    }
                    // success(result);
                    // console.log(result);
                }
                db.close();
            });

        })
    },
    put: () => (console.log(arguments), Promise.resolve()),
    delete: () => (console.log(arguments), Promise.resolve()),
}
