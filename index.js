const userData = {
  'USD': 1000,
  'EUR': 900,
  'UAH': 15000,
  'BIF': 20000,
  'AOA': 100,
};
const bankData = {
  'USD': {
    max: 3000,
    min: 100,
    img: '💵',
  },
  'EUR': {
    max: 1000,
    min: 50,
    img: '💶',
  },
  'UAH': {
    max: 0,
    min: 0,
    img: '💴',
  },
  'GBP': {
    max: 10000,
    min: 100,
    img: '💷',
  }
}

const getMoney = (userData, bankData) => {
  return new Promise((resolve, reject) => {
    const userChoice = confirm('View card balance?');
    userChoice ? resolve(userData) : reject({userData: userData, bankData: bankData});
  })
}

getMoney(userData, bankData)
  .then(
    (userData) => {
      const currencys = Object.keys(userData).map(item => item.toUpperCase());
      const promptValidCurrency = () => {
        const inputCurrency = prompt('Enter the currency in which the balance will be displayed');
        const currency = inputCurrency ? inputCurrency.toUpperCase() : inputCurrency;
        return currencys.includes(currency) ? currency : promptValidCurrency();
      };
      const currency = promptValidCurrency();
      console.log(`Balance is: ${userData[currency]} ${currency}`);
    },
    (data) => {
      const userCurrencys = Object.keys(data.userData).map(item => item.toUpperCase());
      const bankCurrencys = Object.keys(data.bankData).map(item => item.toUpperCase());
      const promptValidCurrency = () => {
        const inputCurrency = prompt('Enter the currency in which you want to withdraw the money');
        const currency = inputCurrency ? inputCurrency.toUpperCase() : inputCurrency;
        return userCurrencys.includes(currency) && bankCurrencys.includes(currency) ? currency : promptValidCurrency();
      };
      const currency = promptValidCurrency();
      const promptValidWithdrawalAmount = () => {
        const withdrawalAmount = parseInt(prompt('Enter the amount for cash withdrawal'));
        return isNaN(withdrawalAmount) ? promptValidWithdrawalAmount() : withdrawalAmount;
      };
      const withdrawalAmount = promptValidWithdrawalAmount();
      if (data.userData[currency] >= withdrawalAmount) {
        data.bankData[currency].max >= withdrawalAmount
          ? data.bankData[currency].min <= withdrawalAmount
          ? console.log(`Here are your cash ${withdrawalAmount} ${currency} ${data.bankData[currency].img}`)
          : console.log(`The entered amount is less than the allowed minimum. Minimum withdrawal amount: ${data.bankData[currency].min} ${currency}`)
          : console.log(`The entered amount is greater than the allowed maximum. Maximum withdrawal amount: ${data.bankData[currency].max} ${currency}`);
      } else {
        console.log(`You don't have enough money in your account. You have only ${data.userData[currency]} ${currency}`);
      }
    },
  )
  .finally(() => {console.log('Thank you, have a nice day 😊')});