hr.history [![Build Status](https://travis-ci.org/HappyRhino/hr.history.png?branch=master)](https://travis-ci.org/HappyRhino/hr.history)
=============================

> History and router utility for HappyRhino

## Installation

```
$ npm install hr.history
```

## Documentation

#### Create a router

```js
var history = require("hr.history");

var router = new history.Router({
    routes: {
        "post/:id": function(postId) {
            // Do something with the post id
        }
    }
});

// Start handling history
router.start();
```

#### Navigate

```js
router.navigate("post/:id", { id: "hello-world" });
```
