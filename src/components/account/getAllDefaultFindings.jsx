import getURL from "../urlGetter";


export default function getAllDefaultFindings(){
    const url = getURL()+"/api/findings/?format=json";
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        sessionStorage.setItem("defFindings", data);
        //alert('Saved');
    });

   
    
}