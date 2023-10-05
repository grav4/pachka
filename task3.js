 function useRequest(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)

    xhr.onload = function(){
        if(xhr.status != 200){
            console.log("Status is: ", xhr.status);
        }
        else{
            const result = JSON.parse(xhr.response);
            if(callback){
                callback(result);
            }
        }
    }

    xhr.onerror = function(){
        console.log("Error! Status is: ", xhr.response);
    }

    xhr.send();
 }


 const resultNode = document.querySelector('.result');
 const buttonNode = document.querySelector('.btn');
 const inputNode = document.querySelector('.inpt');

 
 function displayResult(apiData){
        let cards = '';
        apiData.forEach(item => {
            const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-image">
                <p>${item.author}</p>
            </div>
            `;
            cards = cards + cardBlock;
        });

        resultNode.innerHTML = cards;
 }

 buttonNode.addEventListener('click', () =>{
    const inputNodeValue = inputNode.value;
    if(inputNodeValue > 10 || inputNodeValue < 1){
        resultNode.textContent = 'The number is outside the range of 1 to 10';
    }
    else resultNode.textContent = '';
    useRequest('https://picsum.photos/v2/list?limit=${inputNodeValue}',displayResult);
 });