function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function saveContact() {
    let formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        province: document.getElementById("province").value,
        postalCode: document.getElementById("postalCode").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        emailAddress: document.getElementById("emailAddress").value,
        comments: document.getElementById("comments").value
    };
    // let isValid = validateForm(formData);
    let isValid = true;

    if (isValid) {
        if (typeof (Storage) !== "undefined") {
            let contacts = localStorage.getItem("contacts");
            if (contacts === null)
                contacts = [];
            else
                contacts = JSON.parse(contacts);
            contacts.push(formData);
            localStorage.setItem("contacts", JSON.stringify(contacts));
        } else {
            // Sorry! No Web Storage support..
        }
    }

}

function getContacts() {
    if (typeof (Storage) !== "undefined") {
        let contacts = JSON.parse(localStorage.getItem("contacts"));
        return contacts;
    } else {
        // Sorry! No Web Storage support..
    }
}

function getColumnsName() {
    return ["First Name",
        "Last Name",
        "Address",
        "City",
        "Province",
        "Postal Code",
        "Phone Number",
        "Email Address",
        "Comments"]
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let col of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(col);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        row.setAttribute("onclick", "deletePage(this)");
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function deleteContact(id) {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    contacts.splice(id, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}