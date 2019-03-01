ROOT = "http://localhost:5000/";
LABEL_1 = ['类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3']
LABEL_2 = ['类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3']

$("#username").innerText = window.localStorage.getItem("username");
$("#logout").css("display","block");


//登录成功后，获取标签列表，并动态创建
var first = document.getElementById("label-1");
for(var i=0;i<LABEL_1.length;i++){
    var part = document.createElement("div");
    part.innerHTML = LABEL_1[i];
    part.setAttribute("class","untapped");
    first.appendChild(part);
}
var divs_1 = first.getElementsByTagName("div");
for(var i=0;i<divs_1.length;i++){
    divs_1[i].onclick = function(){
        var thisClass = this.getAttribute("class");
        if(thisClass == "untapped"){
            this.setAttribute("class","tapped");
        }else if (thisClass == "tapped") {
            this.setAttribute("class","untapped");
        }

    }
}
var second = document.getElementById("label-2");
for(var i=0;i<LABEL_2.length;i++){
    var part = document.createElement("div");
    part.innerHTML = LABEL_2[i];
    part.setAttribute("class","untapped");
    second.appendChild(part);
}
var divs_2 = second.getElementsByTagName("div");
for(var i=0;i<divs_2.length;i++){
    divs_2[i].onclick = function(){
        var thisClass = this.getAttribute("class");
        if(thisClass == "untapped"){
            this.setAttribute("class","tapped");
        }else if (thisClass == "tapped") {
            this.setAttribute("class","untapped");
        }

    }
}
//选择文章编号
document.getElementById("article_id_btn").onclick = function load_articles(){
    console.log(11);
    $.ajax({
        url:ROOT + 'push_labels',
        type:'POST',
        dataType:"JSON",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify({
            /*qingqwiu，值待定*/
            'article_id':$("#article_id").val(),
        }),
        success:function(data){
            if(data.flag == 1){
                console.log("获取文章成功！");
                window.localStorage.setItem("article_id",$("#article_id").val());
            }
            else{
                alert(data.errorText);
            }
        },
        error:function(data){

        }
    })
}
//点击确认，提交已选标签
$("#confirm").click(function(){
    var divs_selected_1 = $("#label-1 .tapped");
    var divs_selected_2 = $("#label-2 .tapped");
    var labels_selected_1 = [];
    var labels_selected_2 = [];
    for(var i=0;i<divs_selected_1.length;i++){
        labels_selected_1.push(divs_selected_1[i].innerText);
    }
    for(var i=0;i<divs_selected_2.length;i++){
        labels_selected_2.push(divs_selected_2[i].innerText);
    }
    console.log(labels_selected_1);
    console.log(labels_selected_2);
    $.ajax({
            url:ROOT + 'push_labels',
            type:'POST',
            dataType:"JSON",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                /*传递标签，值待定*/
                'username':window.localStorage.getItem("username"),
                'article_id':$("#article_id").val(),
                'labels':String(labels_selected_1.concat(labels_selected_2))
            }),
            success:function(data){
                console.log(data)
                if(data.flag == 1){
                    var r = confirm("成功！是否继续标注？");
                    if (r==true){
                        /*获取下一篇文章*/
                    }else {
                        /*do nothing*/
                    }
                }
                else{
                    alert(data.errorText);
                }
            },
            error:function(data){

            }
        })
    })