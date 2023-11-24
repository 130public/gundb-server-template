//DEFAULTS
const defaultServers = ["http://localhost:8080/gun","http://192.168.69.420/gun"];

//UPDATE LOCAL STORAGE
let updateStore = (storeKey, data) => {
    localStorage.setItem(storeKey,data);
}
//READ LOCAL STORAGE
let readStore = (storeKey, callback) => {
    let data;
    local = localStorage.getItem(storeKey);
    if (!local) {
        console.log('null');
        data = defaultServers;
    }else{
        data = local;
    }
    callback( data );
}

/****************************
Handle storage
****************************/
let storage_form = document.getElementById('storage_form');
let storage_input = document.getElementById('storage_input');
storage_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('update storage');
    updateStore('gunServers',storage_input.value);
});
/****************************
Handle data
****************************/
let module_name = 'module_tj'
let data_id = document.getElementById('uid_input');
let data_form = document.getElementById('data_form');
let data_input = document.getElementById('data_input');
data_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('retrieve data');
    manageData();
});
let manageData = () => {
    let user_id = (!data_id) ? 'default_id' : data_id.value;
    let module_data = gun.get(user_id).get(module_name);
    module_data.on((data) => { data_input.value = data });
    data_input.oninput = () => { module_data.put(data_input.value) };
}
/****************************
Initiate
****************************/
readStore('gunServers', (d) => {
    const gunServers = d;
    console.log(gunServers);
    gun = Gun(gunServers);
    //
    storage_input.value = gunServers;
    updateStore('gunServers',gunServers);
})