

var $=function(id){
    return document.getElementById(id);
}
var elem_class= function(class_name){
    return document.getElementsByClassName(class_name);
}

       
var orient_arr=[-1,+1];

var tables;

var bk_taken="grey";
var bk_free="green";
document.addEventListener("DOMContentLoaded", take_tables);
function take_tables(){
    var xhttp = new XMLHttpRequest();
    
    
    var id_hall= 1;
    xhttp.onreadystatechange = function() {

        //alert("Ready state="+this.status);
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText!="0 result"){
                //console.log(this.responseText);
                tables=JSON.parse(this.responseText);                
                //window.location.href = 'pages/client.html';
                for(let i=0; i<tables.length; i++){
                    var table= document.createElement("div");
                    table.classList.add("table");
                    table.innerHTML=tables[i].table_name;
                    table.setAttribute("id_table", tables[i].id);
                    if (tables[i].orient==1){
                        table.classList.add("horizontal");
                    }
                    table.setAttribute("id_hall", tables[i].id_hall);
                    table.setAttribute("orient", tables[i].orient);
                    
                    table.setAttribute("state", tables[i].state);

                    if (tables[i].state=="1"){
                        table.style.backgroundColor=bk_taken;
                        
                    }
                    else{
                        table.style.backgroundColor=bk_free;
                    }
                    table.style.top=tables[i].pos_y+"px";
                    table.style.left=tables[i].pos_x+"px";
                    //функція drag and drop 
                    // Правий клік повертає на 90 градусів
                    // Змінювати орієнтацію 
                    // Зберегти розташування столів
                    //Запит формата json- збереження і зміна 
                    table.oncontextmenu = function(){
                        var orient=this.getAttribute("orient");
                        this.classList.toggle("horizontal");
                        
                        this.setAttribute("orient", orient-orient_arr[orient]);
                        
                        //this

                    }
                    dragElement(table);
                    function dragElement(terrariumElement) {
                        let pos1 = 0,
                            pos2 = 0,
                            pos3 = 0,
                            pos4 = 0;
                        terrariumElement.onpointerdown = pointerDrag;
                        
                        function pointerDrag(e) {
                            e.preventDefault();
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            
                            $("hall").onpointermove = elementDrag;
                            $("hall").onpointerup = stopElementDrag;
                            
                        }
                    
                        function elementDrag(e) {
                            pos1 = pos3 - e.clientX;
                            pos2 = pos4 - e.clientY;
                            pos3 = e.clientX;
                            pos4 = e.clientY;
                            
                            terrariumElement.style.top = terrariumElement.offsetTop - pos2 + "px";
                            terrariumElement.style.left = terrariumElement.offsetLeft - pos1 + "px";
                        }
                    
                        function stopElementDrag() {
                            $("hall").onpointerup = null;
                            $("hall").onpointermove = null;
                            //terrariumElement.onpointerup=null;
                            
                        }
                    }
                    

                    table.onclick= function(){
                        var state=this.getAttribute('state');
                        if (state==1){
                            return;
                        }
                        else{
                            var id_table= this.getAttribute("id_table");
                            $("order_div").style.display="block";
                            var xhttp = new XMLHttpRequest();
    
    
                        
                            xhttp.onreadystatechange = function() {
                                console.log(this.responseText)
                            }
                            xhttp.open("GET", "php/take_poducts.php?id=1");
                            xhttp.send();

                        }
                        //Кнопка закрити
                        //1 Частина - список страв
                        //2 Частина - список замовлення 
                    }

                    $("hall").append(table);
                   // var tables_arr=$("hall").getElementsByClassName("table");
                   
                }
                
            }

        }
    }
    xhttp.open("GET", "php/take_tables.php?id_hall="+id_hall);
    xhttp.send();
}


function save_config(ev,tables_arr){
    alert(1);

   
}



$('close_order').onclick= function(){
    $("order_div").style.display="none";
}

//console.log(tables_arr);
//$("save_config_btn").onclick=save_config(event,tables_arr);
$("save_config_btn").onclick= function(ev, tables_arr){
    var tables_arr=$("hall").getElementsByClassName("table");
    //console.log(tables_arr);
    
    ev.preventDefault();
    var json;
    var tables_info=[];

    for(var i=0; i<tables_arr.length; i++){
        var object_table={id:0, table_name:0,pos_x:0,pos_y:0, orient:0, state:0};
        var id=tables_arr[i].getAttribute("id_table");
        var table_name=tables_arr[i].innerHTML;
        var pos_y=tables_arr[i].offsetTop;
        var pos_x=tables_arr[i].offsetLeft;
        var orient=tables_arr[i].getAttribute("orient");
        var state=tables_arr[i].getAttribute("state");
        object_table['id']=id;
        object_table['table_name']=table_name;
        object_table['pos_x']=pos_x;
        object_table['pos_y']=pos_y;
        object_table['orient']=orient;
        object_table['state']=state;
        tables_info.push(object_table);
        
    }
    json=JSON.stringify(tables_info);
    //console.log(json);

    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            //alert("Ready state="+this.status);
            if (this.readyState == 4 && this.status == 200) {
                
                //console.log(JSON.parse(this.responseText));
                console.log(this.responseText);
                
                
            }
            
        };    
    xhttp.open("POST", "php/save_config.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(json);
}


//}


//.ondblclick=save_config(tables_arr);