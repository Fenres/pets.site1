import React, { useState, useEffect } from 'react';
import FoundPets from "../components/foundanimals";
import MyAkc from "../components/propsMya";

function MyAccount() {
    
    let [user, setUser]=useState([]);
    useEffect(()=>load(),[])
    function load(){
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer 58xn0vKJdr98HCZc0l9Pnmmb4A63OCQzb9oI1PGJQeK6RQvQwgHzeyzB9f0dIInnmronoe5omPRjbr9Z");
  
  
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("https://pets.сделай.site/api/users", requestOptions)
    .then((response) => response.json())
    .then((result) => {console.log(result);
     setUser(result);
    });
    }


    // Пока идет загрузка
    

    // Если данные не загружены
    if (!user) {
        return (
            <div className="container">
                <h2 className="text-center">{ 'Пожалуйста, авторизуйтесь или проверьте соединение.'}</h2>
            </div>
        );
    }

    return (
        <div>
            <MyAkc data={user} />
            <FoundPets />
        </div>
    );
}

export default MyAccount;
