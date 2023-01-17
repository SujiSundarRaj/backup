window.addEventListener('load', () => {
    registerSw();
})

async function registerSw(){
if ('serviceWorker' in navigator) {
    try{
   await navigator.serviceWorker.register('/profilo-sw.js');
    }catch(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        }
    }
}