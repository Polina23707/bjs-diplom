"use strict"

// const { response } = require("express");

//Выход из личного кабинета
const logout = new LogoutButton();
// console.log(logout);
logout.action = () => {
  ApiConnector.logout((response) =>{
    // console.log('exit');
    // console.log(response);
    if (response.success) {
      location.reload();
    }
  })
};

//Получение информации о пользователе
ApiConnector.current(response => {
  // console.log(response);
  if (response.success) {
    // console.log(response.data);
    ProfileWidget.showProfile(response.data);
  }
})


// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
// console.log(ratesBoard);

// setInterval(() => {
//   ApiConnector.getStocks(response => {
//     // console.log(response);
//     // console.log(response.success);
//     if (response.success) {
//       ratesBoard.clearTable();
//       ratesBoard.fillTable(response.data);
//     }
//   })
// }, 60000);

function fillRatesBoard() {
  ApiConnector.getStocks(response => {
  // console.log(response);
  // console.log(response.success);
  if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  }
})
}

fillRatesBoard();
setInterval(() => fillRatesBoard(), 60000);



//Операции с деньгами
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    // console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Денежки добавлены');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    // console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Денежки сконвертированы');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, response => {
    // console.log(response);
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Денежки отправлены');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  })
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  // console.log(response);
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
  
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, response => {
    // console.log(response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Дружочек добавлен');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  }) 
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, response => {
    // console.log(response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Дружочек теперь не дружочек');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  }) 
}