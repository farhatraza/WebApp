function validateForm() {
    $(".text-danger").text('');
    $(".text-danger").attr('hidden', true);
    let x = document.forms["contact-form"]["firstName"].value;
    if (x == "") {
        document.getElementById("firstName_vText").innerHTML = "First Name is required";
        $("#firstName_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["lastName"].value;
    if (x == "") {
        document.getElementById("lastName_vText").innerHTML = "Last Name is required";
        $("#lastName_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["address"].value;
    if (x == "") {
        document.getElementById("address_vText").innerHTML = "Address is required";
        $("#address_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["city"].value;
    if (x == "") {
        document.getElementById("city_vText").innerHTML = "City is required";
        $("#city_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["province"].value;
    if (x == "") {
        document.getElementById("province_vText").innerHTML = "Province is required";
        $("#province_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["postalCode"].value;
    if (x == "") {
        document.getElementById("postalCode_vText").innerHTML = "PostalCode pattern is required NAN ANA ";
        $("#postalCode_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["phoneNumber"].value;
    if (x == "") {
        document.getElementById("phoneNumber_vText").innerHTML = "PhoneNumber is required";
        $("#phoneNumber_vText").removeAttr('hidden');
        return false;
    }/* else if (!x.value.match(/^\d{10}$/)) {
        document.getElementById("phoneNumber_vText").innerHTML = "PhoneNumber pattern is (111)111-1111";
        return false;
    }*/
    x = document.forms["contact-form"]["emailAddress"].value;
    if (x == "") {
        document.getElementById("emailAddress_vText").innerHTML = "Email Address is required";
        $("#emailAddress_vText").removeAttr('hidden');
        return false;
    }
    x = document.forms["contact-form"]["comments"].value;
    if (x == "") {
        document.getElementById("comments_vText").innerHTML = "Note Field is required";
        $("#comments_vText").removeAttr('hidden');
        return false;
    }
    saveContact();
    return true;
}

// Functions for Save Contact

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
    let tbody = document.createElement("tbody");
    for (let element of data) {
        let row = tbody.insertRow();
        row.setAttribute("onclick", "deletePage(this)");
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
    table.appendChild(tbody);
}

function deleteContact(id) {
    let contacts = JSON.parse(localStorage.getItem("contacts"));
    contacts.splice(id, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
