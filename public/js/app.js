console.log('Client side javascript file is loaded!');

const button = document.querySelector('.btn');
button.addEventListener('click', function(event){
    const location = document.querySelector('.input-location').value;
    if(location.length === 0){
        event.preventDefault();
    }
})
