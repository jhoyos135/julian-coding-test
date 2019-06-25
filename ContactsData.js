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

    addClasses() {
        let main = document.querySelector('#main');
        main.classList.add('container');
        let table = document.querySelector('table');
        table.classList.add('table');
    }

    getData() {
        let tableDiv = document.querySelector('#appendTable');
        tableDiv.innerHTML = '';

        // delete any duplication
        const seen = new Set();
        let newContactList = contacts.filter(contact => {
            const duplicate = seen.has(contact.id);
            seen.add(contact.id);
            return !duplicate
        });

        for(let i in newContactList) {
            let list = newContactList[i];
            let tableRow = document.createElement('tr');
            tableRow.setAttribute('data-id', list.id);
            tableRow.classList.add('custom_row');
            let favoriteTd = list.favorite;
            if(favoriteTd === 'true') {
                tableRow.style.backgroundColor = 'yellow';
                tableRow.classList.add('favorite');
            };
            tableRow.innerHTML += `
                    <td name='name' value='${list.name}'>${list.name}</td>
                    <td name='phone' value='${list.phone}'>${list.phone}</td>
                    <td name='email' value='${list.email}'>${list.email}</td>
                    <td name='nickname' value='${list.nickname}'>${list.nickname}</td>
                    <td> 
                        <button data-id='${list.id}' class='btn btn-info edit' data-target='#edit' data-toggle='modal'> 
                        edit
                        </button>
                    </td>
                    <td> <button class='btn btn-danger remove'> remove </button> </td>
            `;
            tableDiv.appendChild(tableRow);
        }
        ui.remove();
        ui.edit();
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

    updateValidation(e) {
        e.preventDefault();
        const name2 = document.querySelector('#name2').value;
        const phone2 = document.querySelector('#phone2').value;
        const email2 = document.querySelector('#email2').value;
        const nickname2 = document.querySelector('#nickname2').value;
        const id2 = document.querySelector('#id2').value;

        // checks if the favorite is checked or not
        if(favorite2.checked) {
            favorite2.value = 'true';
        } else {
            favorite2.value = 'false';
        }

        const formUpdateObj = {
            id: id2,
            name: name2,
            phone: phone2,
            email: email2,
            nickname: nickname2,
            favorite: favorite2.value
        };

        // this validation can get very complex, here I'm only checking if the input values are empty and if the email is correct
        const RegMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(name2 === '' || phone2 === '' || email2 === '' || nickname2 === '') {
            init.message('Missing values', 'alert alert-danger');
        } else if(!RegMail.test(email2)) {
            init.message('Please add a valid email', 'alert alert-danger');
        }else {
            // submit the form after validation
            ui.submitForm(formUpdateObj);
            // document.querySelector('#edit').modal('hide')
            // reset the form after submission
            form2.reset();
        }
    }

    message(message, className) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class='alert alert-dismissible alert-${className} container message'>
                <button type='button' class='close' data-dismiss='alert'>X</button>
                ${message}
            </div>
        `;
        const reference = document.querySelector('body');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2500);

    }
};
class UI {

    remove() {
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

   edit() {
    let editNode = document.querySelectorAll('.edit');
    editNode.forEach(node => {
      node.addEventListener('click', (e) => {
          let targetNode = e.target.parentElement.parentElement;
          let nodeID = targetNode.dataset.id;
            let i = Array.from(targetNode.children).splice(0,4)
            let valuesArr = [];
            i.forEach(target => {
                let name = target.getAttribute('name');
                let contactObj = {
                    [name]: target.innerHTML
                }
                valuesArr.push(contactObj);
            });
            let fav;
            if(targetNode.classList.contains('favorite')) {
                fav = 'true'
            } else {
                fav = 'false'
            }
            let formObj = Object.assign({
                id: nodeID, 
                favorite: fav},
                 ...valuesArr);
            ui.populateForm(formObj);

      })
    })
    }
    
    populateForm(obj) {
        const name = document.querySelector('#name2');
        const phone = document.querySelector('#phone2');
        const email = document.querySelector('#email2');
        const nickname = document.querySelector('#nickname2');
        const favorite = document.querySelector('#favorite2');
        const id2 = document.querySelector('#id2');

        name.value = obj.name;
        phone.value = obj.phone;
        email.value = obj.email;
        nickname.value = obj.nickname;
        id2.value = obj.id;
        if(obj.favorite === 'true') {
            favorite.checked = true
        } else {
            favorite.checked = false
        }
    }

    submitForm(obj) {
        // add info to the user interface 
        // here it is added to the object, but instead it would be saved into a database;
        contacts.unshift(obj);

        init.message('Contact Added', 'alert alert-success');
        $('#edit').modal('hide');

        init.getData();
    }
};

let init = new Init();
let ui = new UI();

// event listeners
document.addEventListener('DOMContentLoaded', () => {
    init.getData();
    init.addClasses()
    document.querySelector('#form').addEventListener('submit', init.validation );
    document.querySelector('#form2').addEventListener('submit', init.updateValidation );
    
});

