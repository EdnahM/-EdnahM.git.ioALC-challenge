if (!window.indexedDB) {
    window.alert("Choose another browser.");
}
else {
  console.log("IndexedDB support");
}

fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response=> {
       return response.json();
    }).then(data =>{

    const currencyData = Object.entries(data.results);
    let mainMap = new Map();
    for(const currency of currencyData){
        let currencyName = currency[1].currencyName;
        let currencyId = currency[1].id;
        mainMap.set(currency[1].id, currency[1].currencyName);
    }
    return mainMap;
    })

    .then(currencyMap =>{
        yourCurrency = document.getElementById('fromCurrency');
        toCurrency = document.getElementById('toCurrency');
        for (const cur of currencyMap) {
            let[id, name] = cur;
           yourCurrency.add(new Option(name, id));
           toCurrency.add(new Option(name, id));   
        }
    })
    .catch(err => {
        console.log("error found", err);
    })


const formSubmit= document.getElementById('form');
formOk.addEventListener('Ok', event => {
  event.preventDefault();
  let fromField = document.getElementById('fromCurrency').value;
  let toField = document.getElementById('toCurrency').value;
   urlQuery =  'https://free.currencyconverterapi.com/api/v5/convert?q='
   queryString = urlQuery + fromField + '_' + toField;
    fetch(queryString)
    .then(response =>{
        return response.json();
    }).then(data => {
        
        const convertResult = Object.entries(data.results);
       
        let rate = convertResult[0][1].val;
        return rate;
       
    }).then(rate => {
        let inputAmount = document.getElementById('fromAmount').value;
        let outputValue= rate * inputAmount;
        document.getElementById('toAmount').value =outputValue;
    })
});
            
if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('../sw.js').then((registration) => {
      console.log('Registration successful');
     })
     .catch((error) => {
        console.log('error: occured', error);
     });

}
