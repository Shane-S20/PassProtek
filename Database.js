chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'insert') {
        let insert_request = insert_data(request.payload);
        
        insert_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'insert_success',
                payload: res
           });
        });
    }
    else if (request.message === 'retrieve') {
        let retrieve_request = get_data(request.payload);
        
        retrieve_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'retrieval_success',
                payload: res
           });
        });
    }
    else if (request.message === 'update') {
        let update_request = update_data(request.payload);
        
        update_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'update_success',
                payload: res
           });
        });
    }
    else if (request.message === 'delete') {
        let delete_request = delete_data(request.payload);
        
        delete_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'delete_success',
                payload: res
           });
        });
    }
});

let testCases = [
    {
    "WebsiteName": "Google",
    "loginUname": "ShaneS",
    "loginPword": "password",
    "loginURL": "https://www.google.com"
    },
    {
    "WebsiteName": "Amazon",
    "loginUname": "MoneySpender123",
    "loginPword": "Money$$",
    "loginURL": "https://www.amazon.com"
    }
]

let db = null;

function create_database() {
    const request = window.indexedDB.open('TestDB');

    request.onerror = function (event) {
        console.log("Problem opening DB.");
    }

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        let objectStore = db.createObjectStore('testCases', {
            keyPath: 'WebsiteName'
        });

        objectStore.transaction.oncomplete = function (event) {
            console.log("ObjectStore Created.");
        }
    }

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("DB OPENED");
        //insert_records(testCases);
    }
}

function insert_data(records) {
    if (db) {
        const insert_transaction = db.transaction("testCases", "readwrite");
        const objectStore = insert_transaction.objectStore("testCases");

        return new Promise((resolve, reject) => {
            insert_transaction.oncomplete = function () {
                console.log("ALL INSERT TRANSACTIONS COMPLETE.");
                resolve(true);
            }

            insert_transaction.onerror = function () {
                console.log("PROBLEM INSERTING RECORDS.")
                resolve(false);
            }

            records.forEach(profile => {
                let request = objectStore.add(profile);

                request.onsuccess = function () {
                    console.log("Added: ", profile);
                }
            });
        });
    }
}

function get_data(WebsiteName) {
    if (db) {
        const get_transaction = db.transaction("testCases", "readonly");
        const objectStore = get_transaction.objectStore("testCases");

        return new Promise((resolve, reject) => {
            get_transaction.oncomplete = function () {
            console.log("ALL GET TRANSACTIONS COMPLETE.");
            }

            get_transaction.onerror = function () {
            console.log("PROBLEM GETTING RECORDS.")
            }

            let request = objectStore.get(WebsiteName);

            request.onsuccess = function (event) {
                resolve(event.target.result);
            }
        });
    }
}

function update_data(modification) {
    if (db) {
        const put_transaction = db.transaction("testCases", "readwrite");
        const objectStore = put_transaction.objectStore("testCases");

        return new Promise((resolve, reject) => {
            put_transaction.oncomplete = function () {
                console.log("ALL PUT TRANSACTIONS COMPLETE.");
                resolve(true);
            }

            put_transaction.onerror = function () {
                console.log("PROBLEM UPDATING RECORDS.")
                resolve(false);
            }

            objectStore.put(modification);
        });
    }
}

function delete_data(WebsiteName) {
    if (db) {
        const delete_transaction = db.transaction("testCases", "readwrite");
        const objectStore = delete_transaction.objectStore("testCases");

        return new Promise((resolve, reject) => {
            delete_transaction.oncomplete = function () {
                console.log("ALL DELETE TRANSACTIONS COMPLETE.");
                resolve(true);
            }

            delete_transaction.onerror = function () {
                console.log("PROBLEM DELETE RECORDS.")
                resolve(false);
            }

            objectStore.delete(WebsiteName);
        });
    }
}

create_database();