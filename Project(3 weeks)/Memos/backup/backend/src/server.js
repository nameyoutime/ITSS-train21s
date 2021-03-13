const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require('cors');
const config = require('./config')
app.use(body.json());
app.use(cors());

const admin = require('firebase-admin');
const serviceAccount = require('../key.json');
const { query } = require("express");
const databaseURL = "https://memos-95257-default-rtdb.firebaseio.com/"
function init() {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseURL
        });
        console.log("database is connected!");
    } catch (err) {
        console.log("connect to server failed!");
    }
    try {
        app.listen(config.PORT, config.HOST, () => {
            console.log(`server is running on ${config.HOST}:${config.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}
init();

app.get("/notes", async (req, res) => {
    let test = []
    // admin.firestore().collection('user').doc("user").collection("notes").doc
    await admin.firestore().collection("user").doc("user1").collection("notes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            test.push(doc.data());
        });
    });
    await res.send(test);
})
app.get("/notes/id", async (req, res) => {
    let { id } = req.query;
    let temp;
    temp = await admin.firestore().collection("user").doc("user1").collection("notes").doc(id).get();
    res.send(temp.data());
})
app.put("/notes/id/update/color", (req, res) => {
    let { id, color, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("notes").doc(id.toString()).update({
                color: color
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.put("/shared/id/update/title", (req, res) => {
    let { id, update,shareFrom,shareTo } = req.body;
    // console.log(shareTo)
    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("notes").doc(id.toString()).update({ title: update });
            await admin.firestore().collection("user").doc(shareTo).collection("sharedNote").doc(shareFrom).collection("notes").doc(id).update({title: update})
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.put("/shared/id/update/description", (req, res) => {
    let { id, update,shareFrom,shareTo } = req.body;
    // console.log(shareTo,shareFrom,id,update)
    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("notes").doc(id.toString()).update({ description: update });
            await admin.firestore().collection("user").doc(shareTo).collection("sharedNote").doc(shareFrom).collection("notes").doc(id).update({description: update})
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.put("/shared/id/update/both", (req, res) => {
    let { id, update,update1,shareFrom,shareTo } = req.body;
    // console.log(shareTo,shareFrom,id,update)
    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("notes").doc(id.toString()).update({ title:update,description: update1 });
            await admin.firestore().collection("user").doc(shareTo).collection("sharedNote").doc(shareFrom).collection("notes").doc(id).update({title:update,description: update1})
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/notes/id/update/title", (req, res) => {
    let { id, update, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("notes").doc(id.toString()).update({ title: update });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.put("/notes/id/update/both", (req, res) => {
    let { id, update, update1, user } = req.body;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("notes").doc(id.toString()).update({
                title: update,
                description: update1
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.put("/notes/id/update/description", (req, res) => {
    let { id, update, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("notes").doc(id.toString()).update({ description: update });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/notes/id/update/img", (req, res) => {
    let { id, img, user1 } = req.body;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user1).collection("notes").doc(id.toString()).update({
                imagePreview: img
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();


})

app.put("/shared/id/update/img", (req, res) => {
    let { id, img, shareFrom,shareTo } = req.body;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("notes").doc(id.toString()).update({ imagePreview: img });
            await admin.firestore().collection("user").doc(shareTo).collection("sharedNote").doc(shareFrom).collection("notes").doc(id).update({imagePreview: img})
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();


})

app.delete("/notes/id/delete", (req, res) => {
    let { id, user1 } = req.query;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user1).collection("notes").doc(id.toString()).delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/notes/id/update/pin", async (req, res) => {
    let { id, pin } = req.body;
    let temp;
    temp = await admin.firestore().collection("user").doc("user1").collection("notes").doc(id).update({
        id: id,
        pin: pin
    });
    res.send(temp);
})


app.get("/id", async (req, res) => {
    temp = (await admin.firestore().collection("user").doc("user1").collection("id").doc("id").get()).data();
    res.send(temp);
})
app.post("/notes/create", (req, res) => {
    let { id, num, title, description, pin, labels, date, time,
        shareFrom, shareTo, selectedColor, color, imagePreview, todoList, arhieved, showTodo, trash } = req.body;
    let data = {
        id: id,
        shareFrom: shareFrom,
        shareTo: shareTo,
        num: num,
        title: title,
        description: description,
        pin: pin,
        labels: labels,
        // date: Date.now(),
        // time: time,
        selectedColor: selectedColor,
        color: color,
        imagePreview: imagePreview,
        todoList: todoList,
        showTodo: showTodo,
        arhieved: arhieved,
        trash: trash
    };

    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("notes").doc(data.id).create(data);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

app.post("/notes/tranferToFlag", async (req, res) => {
    let { id, num, title, description, pin, labels, date, time,
        selectedColor, color, imagePreview, todoList, arhieved, showTodo, trash } = req.body;

    let data = {
        id: id,
        num: num,
        title: title,
        description: description,
        pin: pin,
        labels: labels,
        // date: Date.now(),
        // time: time,
        selectedColor: selectedColor,
        color: color,
        imagePreview: imagePreview,
        todoList: todoList,
        showTodo: showTodo,
        arhieved: arhieved,
        trash: trash
    };

    setTimeout(() => {
        admin.firestore().collection("user").doc("user1").collection("notes").doc(id).delete();
    }, 500)

    admin.firestore().collection("user").doc("user1").collection("flags").doc(id).create(data);
})

app.post("/flags/tranferToNotes", async (req, res) => {
    let { id, num, title, description, pin, labels, date, time,
        selectedColor, color, imagePreview, todoList, arhieved, showTodo, trash } = req.body;
    let data = {
        id: id,
        num: num,
        title: title,
        description: description,
        pin: pin,
        labels: labels,
        // date: Date.now(),
        // time: time,
        selectedColor: selectedColor,
        color: color,
        imagePreview: imagePreview,
        todoList: todoList,
        showTodo: showTodo,
        arhieved: arhieved,
        trash: trash
    };
    setTimeout(() => {
        admin.firestore().collection("user").doc("user1").collection("flags").doc(id).delete();
    }, 500)

    admin.firestore().collection("user").doc("user1").collection("notes").doc(id).create(data);
})
app.post("/flags/create", (req, res) => {
    let { id, num, title, description, pin, labels, date, time,
        shareTo, shareFrom, selectedColor, color, imagePreview, todoList, arhieved, showTodo, trash } = req.body;
    let data = {
        id: id,
        shareFrom: shareFrom,
        shareTo: shareTo,
        num: num,
        title: title,
        description: description,
        pin: pin,
        labels: labels,
        // date: Date.now(),
        // time: time,
        selectedColor: selectedColor,
        color: color,
        imagePreview: imagePreview,
        todoList: todoList,
        showTodo: showTodo,
        arhieved: arhieved,
        trash: trash
    };
    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("flags").doc(id.toString()).create(data);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.get("/flags", async (req, res) => {
    let test = []
    await admin.firestore().collection("user").doc("user1").collection("flags").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            test.push(doc.data());
        });
    });
    await res.send(test);
});
app.put("/flags/id/update/img", (req, res) => {
    let { id, img, pin, user1 } = req.body;
    switch (pin) {
        case false: {
            (async () => {
                try {
                    await admin.firestore().collection("user").doc(user1).collection("notes").doc(id.toString()).update({
                        imagePreview: img
                    });
                    return res.status(200).send();
                } catch (error) {
                    console.log(error);
                    return res.status(500).send(error);
                }
            })();
            break;
        }
        case true: {
            (async () => {
                try {
                    await admin.firestore().collection("user").doc(user1).collection("flags").doc(id.toString()).update({
                        imagePreview: img
                    });
                    return res.status(200).send();
                } catch (error) {
                    console.log(error);
                    return res.status(500).send(error);
                }
            })();



            break;
        }
        default:
            console.log("cant update img");
    }


})

app.put("/flags/id/update/title", (req, res) => {
    let { id, update, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("flags").doc(id.toString()).update({ title: update });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/flags/id/update/both", (req, res) => {
    let { id, update, update1, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("flags").doc(id.toString()).update({
                title: update,
                description: update1
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/flags/id/update/description", (req, res) => {
    let { id, update, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("flags").doc(id.toString()).update({ description: update });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})


app.get("/flags/id", async (req, res) => {
    let { id } = req.query;
    let temp;
    temp = await admin.firestore().collection("user").doc("user1").collection("flags").doc(id).get();
    res.send(temp.data());
})
app.delete("/flags/id/delete", (req, res) => {
    let { id, user1 } = req.query;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user1).collection("flags").doc(id.toString()).delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();


})
app.put("/flags/id/update/color", (req, res) => {
    let { id, color, user } = req.body;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("flags").doc(id.toString()).update({
                color: color
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})




app.post("/archives/create", (req, res) => {
    let { id, num, title, description, pin, labels, date, time,
        shareFrom, shareTo, selectedColor, color, imagePreview, todoList, arhieved, showTodo, trash } = req.body;
    let data = {
        id: id,
        num: num,
        shareFrom: shareFrom,
        shareTo: shareTo,
        title: title,
        description: description,
        pin: pin,
        labels: labels,
        // date: Date.now(),
        // time: time,
        selectedColor: selectedColor,
        color: color,
        imagePreview: imagePreview,
        todoList: todoList,
        showTodo: showTodo,
        arhieved: arhieved,
        trash: trash
    };
    (async () => {
        try {
            await admin.firestore().collection("user").doc(data.shareFrom.toString()).collection("archives").doc(data.id).create(data);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.get("/archives", async (req, res) => {
    let test = []
    // res.send("history");
    await admin.firestore().collection("user").doc("user1").collection("archives").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            test.push(doc.data());
        });
    });
    await res.send(test);
})

app.get("/archives/id", async (req, res) => {
    let { id } = req.query;
    let temp;
    temp = await admin.firestore().collection("user").doc("user1").collection("archives").doc(id).get();
    res.send(temp.data());
})
app.delete("/archives/id/delete", (req, res) => {
    let { id, user1 } = req.query;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user1).collection("archives").doc(id.toString()).delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();


})
app.put("/archives/id/update/color", (req, res) => {
    let { id, color, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("archives").doc(id.toString()).update({
                color: color
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();


})

app.put("/archives/id/update/title", (req, res) => {
    let { id, update, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("archives").doc(id.toString()).update({ title: update });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})

app.put("/archives/id/update/both", (req, res) => {
    let { id, update, update1, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("archives").doc(id.toString()).update({
                title: update,
                description: update1
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/archives/id/update/description", (req, res) => {
    let { id, update, user } = req.body;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("archives").doc(id.toString()).update({ description: update });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.put("/archives/id/update/img", (req, res) => {
    let { id, img, user1 } = req.body;
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user1).collection("archives").doc(id).update({
                imagePreview: img
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})





app.post("/trashs/create", (req, res) => {
    let { id, num, title, description, pin, labels, date, time,
        shareTo, shareFrom, selectedColor, color, imagePreview, todoList, arhieved, showTodo, trash } = req.body;
    let data = {
        id: id,
        num: num,
        shareFrom: shareFrom,
        shareTo: shareTo,
        title: title,
        description: description,
        pin: pin,
        labels: labels,
        // date: Date.now(),
        // time: time,
        selectedColor: selectedColor,
        color: color,
        imagePreview: imagePreview,
        todoList: todoList,
        showTodo: showTodo,
        arhieved: arhieved,
        trash: trash
    };
    (async () => {
        try {
            await admin.firestore().collection("user").doc(shareFrom).collection("trashs").doc(id.toString()).create(data);
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})
app.delete("/trashs/delete", (req, res) => {
    let { user }= req.query;
    // console.log(user);
    (async () => {
        try {
            await admin.firestore().collection("user").doc(user).collection("trashs").listDocuments().then(val=>{
                val.map((val)=>{
                    val.delete();
                })
            })
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();

})


app.get("/trashs", async (req, res) => {
    let test = []
    // res.send("history");
    await admin.firestore().collection("user").doc("user1").collection("trashs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            test.push(doc.data());
        });
    });
    await res.send(test);
})

app.get("/trashs/id", async (req, res) => {
    let { id } = req.query;
    let temp;
    temp = await admin.firestore().collection("user").doc("user1").collection("trashs").doc(id).get();
    res.send(temp.data());
})
app.delete("/trashs/id/delete", (req, res) => {
    let { id, user1 } = req.query;

    (async () => {
        try {
            await admin.firestore().collection("user").doc(user1).collection("trashs").doc(id).delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})
app.delete("/trashs/id/delete/all", async (req, res) => {
    let temp;

    // console.log("delete all")
    await admin.firestore().collection("user").doc("user1").collection("trashs").doc().then((data) => {
        console.log("Document successfully deleted")
    });
    await res.send(test);
    // res.send(temp);
})