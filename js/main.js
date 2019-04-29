ROOT = "http://localhost:5000/";
//标签需要替换为  标签.xls  的标签集合
// LABEL_1 = ['类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3'];
//LABEL_2 = ['类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3','类别1','类别2','类别3'];

LABEL_1 = ['无','唇、口腔和咽恶性肿瘤','鼻咽恶性肿瘤','食管恶性肿瘤','胃恶性肿瘤','小肠恶性肿瘤','结直肠恶性肿瘤','肛门和肛管的恶性肿瘤',
            '肝和肝内胆管恶性肿瘤','胆囊恶性肿瘤','胆道其他和未特指部位的恶性肿瘤','胰恶性肿瘤','消化器官其他和不明确的恶性肿瘤',
            '鼻腔、中耳、鼻旁窦恶性肿瘤','喉恶性肿瘤','气管、支气管和肺恶性肿瘤','胸腺恶性肿瘤','心脏、纵隔和胸膜恶性肿瘤，呼吸系统和胸腔内器官其他和不明确部位的恶性肿瘤',
            '四肢骨、关节软骨恶性肿瘤，骨、关节软骨其他和未特指部位的恶性肿瘤','皮肤恶性黑色素瘤，皮肤其他恶性肿瘤','间皮组织和软组织恶性肿瘤','乳房恶性肿瘤',
            '女性生殖器官恶性肿瘤','男性生殖器官恶性肿瘤','泌尿道恶性肿瘤','眼、脑和中枢神经系统其他部位的恶性肿瘤','甲状腺和其他内分泌腺恶性肿瘤',
            '其他和不明确部位的恶性肿瘤','独立(原发)多个部位的恶性肿瘤'];
//:["化学治疗","放射治疗","外科治疗"]  //:["直接扩散","血行转移","淋巴转移"]
LABEL_2 = {
    "临床诊治":["无","病因","检查诊断","治疗","症状及临床表现","预后","鉴别诊断","不良反应","转移扩散"],
    "肿瘤预防":["无","危险因素","健康教育","流行","发病","死亡","趋势","预防","筛查","康复","早诊早治","科普"],
    "肿瘤分期":["无","早期","中晚期","转移","复发"]
};
var l1 = "";
var l2_1 = [];
var l2_2 = [];
var l2_3 = [];
$("#username").innerText = window.localStorage.getItem("username");
$("#logout").css("display","block");


function createOptions(id,dics) {
    if(dics instanceof Array){
        var parent = document.getElementById(id);
        for(var i=0;i<dics.length;i++){
            var part = document.createElement("option");
            part.innerHTML = dics[i];
            part.setAttribute("value",i);
            part.setAttribute("style","width:300px;");
            // part.setAttribute("class","untapped");
            parent.appendChild(part);
        }
    }
}
createOptions("subject_heading",LABEL_1);
createOptions("subtopic_1",LABEL_2["临床诊治"]);
createOptions("subtopic_2",LABEL_2["肿瘤预防"]);
createOptions("subtopic_3",LABEL_2["肿瘤分期"]);

function getTopics() {
    var str = "";
    var str2 = "";
    str2 += LABEL_1[$('#subject_heading').val()]+"\n";
    l1 = LABEL_1[$('#subject_heading').val()];
    if($('#subtopic_1').val()!=null){
        for(var i=0;i<$('#subtopic_1').val().length;i++){
            var value = LABEL_2["临床诊治"][$('#subtopic_1').val()[i]];
            str += value+"\t";
            if(!l2_1.includes(value)){
                l2_1.push(value);
            }
        }
    }
    if($('#subtopic_2').val()!=null){
        for(var i=0;i<$('#subtopic_2').val().length;i++){
            var value = LABEL_2["肿瘤预防"][$('#subtopic_2').val()[i]];
            str += value+"\t";
            if(!l2_2.includes(value)){
                l2_2.push(value);
            }
        }
    }
    if($('#subtopic_3').val()!=null){
        for(var i=0;i<$('#subtopic_3').val().length;i++){
            var value = LABEL_2["肿瘤分期"][$('#subtopic_3').val()[i]];
            str += value+"\t";
            if (!l2_3.includes(value)){
                l2_3.push(value);
            }
        }
    }
    document.getElementById("result_subject_heading").innerText = str2;
    document.getElementById("result_subtopics").innerText = str;
}
document.getElementsByTagName("html")[0].onclick = function () {
    getTopics();
}
//选择文章编号
function load_articles(){
    $.ajax({
        url:ROOT + 'get_article',
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
document.getElementById("article_id_btn").onclick = load_articles();
//点击确认，提交已选标签
$("#confirm").click(function(){
    $.ajax({
            url:ROOT + 'push_labels',
            type:'POST',
            dataType:"JSON",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                /*传递标签，值待定*/
                'username':window.localStorage.getItem("username"),
                'article_id':$("#article_id").val(),
                'labels':{
                    "subjectHeading":l1,
                    "subtopic":l2_1.concat(l2_2,l2_3)
                    // "subtopic":{
                    //     "level_1":l2_1,
                    //     "level_2":l2_2,
                    //     "level_3":l2_3
                    // }
                }
            }),
            success:function(data){
                console.log(data)
                if(data.flag == 1){
                    alert("上传成功！");
                    // var r = confirm("成功！是否继续标注？");
                    // if (r==true){
                    //     /*获取下一篇文章*/
                    // }else {
                    //     /*do nothing*/
                    // }
                }
                else{
                    alert(data.errorText);
                }
            },
            error:function(data){

            }
        })
    })
$("#abandon").click(function(){
    $.ajax({
        url:ROOT + 'abandon',
        type:'POST',
        dataType:"JSON",
        contentType: "application/json; charset=utf-8",
        data:JSON.stringify({
            /*传递标签，值待定*/
            'username':window.localStorage.getItem("username"),
            'article_id':$("#article_id").val(),
        }),
        success:function(data){
            console.log(data)
            if(data.flag == 1){
                alert("上传成功，已标为弃用！");
                // var r = confirm("成功！是否继续标注？");
                // if (r==true){
                //     /*获取下一篇文章*/
                // }else {
                //     /*do nothing*/
                // }
            }
            else{
                alert(data.errorText);
            }
        },
        error:function(data){

        }
    })
})