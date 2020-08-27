"use strict";

const registerUser = document.getElementById('regiterUser'),
    login = document.getElementById('login'),
    userName = document.getElementById('userName'),
    list = document.getElementById('list');
    let userList = [];


const render = function(name) {
    list.textContent = '';
    
    userList = [];

    let keysLS = Object.keys(localStorage);
   
    for (let key of keysLS){
      
      if (JSON.parse(localStorage.getItem(key)).guid === 'acc19b2c-e6e2-11ea-adc1-0242ac120002')
      {
        userList.push(JSON.parse(localStorage.getItem(key)));
      }
    }

    if (name !== undefined){
        userName.textContent = name;
    }

    if (userList.length > 0){
            for (let key of userList){
                console.log(userList);
            const li = document.createElement('li');
            li.innerHTML = `${key.firstName} ${key.lastName} ${key.login} ${key.password},
            Registration Date: ${key.createDate} <div class="todo-buttons"><button class="todo-remove"></button></div>`;
            list.append(li) ;

            const btnTodoRemove = li.querySelector('.todo-remove');

            btnTodoRemove.addEventListener('click', function(){

                localStorage.removeItem(key.login);
            
                render();
            });
        }
    }
 };

render();


registerUser.addEventListener('click', function(event){
    event.preventDefault();
     let  userName;

    do { 
        userName = prompt('Enter your first and last name separated by a space', '11 11');
        }
    // while (userName.length < 1);
    while (userName === null ||userName.split(' ').length < 2 || userName.split(' ').length >= 3 || userName.split(' ')[0].trim().length<2 || userName.split(' ')[1].trim().length<2);
    //

    let newlogin;
        do { 
            newlogin  = prompt('Enter your login');
           }
        while (newlogin === null || newlogin.length < 1);

    let password;
        do { 
            password  = prompt('Enter your password');
           }
        while (password === null || newlogin.length < 1);

    if (userName && newlogin && password){
     
        const now = new Date(),
        nowMonth  = now.getMonth(),
        hourName = now.getHours(),
        minuteName = now.getMinutes(),
        secondName = now.getSeconds(),
        dayName = now.getDate(),
        fullYear = now.getFullYear();

        let month;

        switch ( nowMonth ) {
            case 0 : month = 'January';
              break;
            case 1 : month = 'February';
              break;
            case 2 : month = 'March';
              break;
            case 3 : month = 'April';
              break;
            case 4 : month = 'May';
              break;
            case 5 : month = 'June';
              break;
            case 6 : month = 'July';
              break;
            case 7 : month = 'August';
              break;
            case 8 : month = 'September';
              break;
            case 9: month = 'October';
              break;
            case 10: month = 'November';
              break;
            case 11: month = 'December';
              break;}
    //Дата регистрации в формате “20 июня 2020 г., 19:58:47” 
    const createDate = `${dayName} ${month} ${fullYear} h., ${hourName}:${minuteName}:${secondName}`;        

    const user = {
        guid: 'acc19b2c-e6e2-11ea-adc1-0242ac120002',
        firstName : userName.split(' ')[0].trim(),
        lastName : userName.split(' ')[1].trim(),
        login: newlogin,
        password: password,
        createDate: createDate
    };
    
    // userList.push(user);
    let userJSON = JSON.stringify(user);

    localStorage.setItem(newlogin, userJSON);
    } else {
        render();
        return;
    }

    render();
});


login.addEventListener('click', function(event){
    event.preventDefault();
    console.log(userList);

    let userlogin;
    do { 
        userlogin  = prompt('Enter your login');
       }
    while (userlogin === null || userlogin.length < 1);

    let userPass;
    if(userlogin){
        userPass  = prompt('Enter your password');
    }

    let count = 0;
    for (let key of userList){
      
      if (userlogin === key.login && userPass === key.password){
          render(key.firstName);
      } else {
        count++;
        if (count === userList.length)
        {
          alert('Login Failed');
          // render();
        }
      }
   
    }
});
