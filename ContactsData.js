var contacts = [
    {
        'id': '1',
        "name": "Ross Geller",
        "phone": "012-32343253",
        "email": "we_were_on_a_break@dinasours.com",
        "nickname": "unagi",
        "favorite": "true"

    },
    {
        'id': '2',
        "name":"Phoebe Buffay",
        "phone": "012-10000000",
        "email": "smelly_cat@gmail.com",
        "nickname": "Princess Consuela Bananahammock",
        "favorite": "false"
    },
    {
        'id': '3',
        "name":"Joey Tribbiani",
        "phone": "012-123423543",
        "email": "joey@doesnt-share-food.com",
        "nickname": "Baby Kangaroo Tribbiani",
        "favorite": "true"
    }

];
let id;
class Init {
    getData() {
        let tableDiv = document.querySelector('#appendTable');
        tableDiv.innerHTML = '';
        for(let i in contacts) {
            let tableRow = document.createElement('tr');
            tableRow.setAttribute('data-id', contacts[i].id);
            let favoriteTd = contacts[i].favorite;
            if(favoriteTd === 'true') {
                tableRow.style.backgroundColor = 'yellow'
            };
            tableRow.innerHTML += `
                    <td class='name'>${contacts[i].name}</td>
                    <td>${contacts[i].phone}</td>
                    <td>${contacts[i].email}</td>
                    <td>${contacts[i].nickname}</td>
                    <td> <button class='btn btn-info edit'> edit </button> </td>
                    <td> <button class='btn btn-danger remove'> remove </button> </td>
            `;
            tableDiv.appendChild(tableRow);
        }
        ui.removeDiv();
    }
    validation(e) {
        e.preventDefault();
        const form = document.querySelector('#form');
        const name = document.querySelector('#name').value;
        const phone = document.querySelector('#phone').value;
        const email = document.querySelector('#email').value;
        const nickname = document.querySelector('#nickname').value;
        const favorite = document.querySelector('#favorite');

        // checks if the favorite is checked or not
        if(favorite.checked) {
            favorite.value = true;
        } else {
            favorite.value = false;
        }

        // simulates an id
        id = String(Math.floor(Math.random() * 500000));

        const formObj = {
            id: id,
            name: name,
            phone: phone,
            email: email,
            nickname: nickname,
            favorite: favorite.value
        };

        // this validation can get very complex, here I'm only checking if the input values are empty and if the email is correct
        const RegMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(name === '' || phone === '' || email === '' || nickname === '') {
            init.message('Missing values', 'alert alert-danger');
        } else if(!RegMail.test(email)) {
            init.message('Please add a valid email', 'alert alert-danger');
        }else {
            // submit the form after validation
            ui.submitForm(formObj);
            // reset the form after submission
            form.reset();
        }
    }
    message(message, className) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class='alert alert-dismissible alert-${className} container'>
                <button type='button' class='close' data-dismiss='alert'>X</button>
                ${message}
            </div>
        `;
        const reference = document.querySelector('#form');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2500);

    }
};
class UI {
    removeDiv() {
        let removedNode = document.querySelectorAll('.remove');
        removedNode.forEach(node => {
          node.addEventListener('click', (e) => {
                // this will remove it from the contacts array, here it will be delete it from the database
                // based in the id using event delegation
                let targetNode = e.target.parentElement.parentElement;
                let nodeID = targetNode.dataset.id;
                targetNode.remove();
                contacts = contacts.filter(contact => contact.id !== nodeID);
          })
        })
   }
    submitForm(obj) {
        // add info to the user interface 
        // this is push to the object but it would be saved into a database
        contacts.push(obj);
        init.message('Contact Added', 'alert alert-success');
        init.getData();
    }
};

let init = new Init();
let ui = new UI();

// event listeners
document.addEventListener('DOMContentLoaded', () => {
    init.getData();
    document.querySelector('#form').addEventListener('submit', init.validation );
    
});

