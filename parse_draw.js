
let list_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888";
let info_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888";

var result;
let standards;
let label_str;

let first_time = true;
let totalcnt;
var check_cnt=0;

let alert_err = false;

function year(start_year,end_year,sel_genre,country) { // 연도 기준에 기간이랑 국가 장르 다 적용했음!
    result=[0,0,0,0,0,0,0,0,0,0,0,0,0];
    standards=[];
    label_str = '연도별 영화 수';
    check_cnt=0;
    totalcnt=[];
    let sum_cnt=0;

    result.length = end_year-start_year+1;

    if(sel_genre == '전체'){ // 장르 전체면 그냥 개수만 가져오면 끝나.!
         //정보 가져오기. (기본) 1년짜리로 보자. 그러면 2016년 영화 중에서 sel_genre에 있는 애들만.
        for(let i=start_year; i<=end_year; i++) {
            $.ajax({
                method: "GET",
                url: list_url+"&openStartDt="+ i +"&openEndDt="+i+"&repNationCd="+country,
                dataType:"json",
                success:function(data) {
                    console.log(data);

                    // 순서대로 들어가게 하기 위해서 이렇게 함.. 
                    result[i-start_year] = data.movieListResult.totCnt;
                    standards[i-start_year] = i;
                    check_cnt++;
                    console.log(i+"년 영화 수 : "+result[i-start_year]);
                    if(check_cnt == end_year-start_year+1) {
                        // 이렇게 막무가내로 다 채워졌는지 체크해야할까..?
                        draw(label_str,'bar');
                    }
                }
            })
        }
    }
    else {
        // 일단 해당 연도 전체 개수 가져옴.
        for(let i=start_year; i<=end_year; i++) {
            $.ajax({
                method: "GET",
                url: list_url+"&openStartDt="+ i +"&openEndDt="+i+"&repNationCd="+country,
                dataType:"json",
                async:false,
                success:function(data) {
                    totalcnt[i-start_year]=data.movieListResult.totCnt; //각 년도의 총 영화 수 저장.
                    console.log(totalcnt[i-start_year]);
                    standards[i-start_year] = i;
                    sum_cnt +=data.movieListResult.totCnt; // 찐 총합. 그래프 그릴 타이밍 보ㅇ는거임.
                }
            })
        }


        for(let i=start_year; i<=end_year; i++) { // 매 년 마다
            console.log('dd');

            // 이제 페이지 돌면서 장르에 속하는것들 추려냄.
            for(let j=1; j<Math.floor((totalcnt[i-start_year]-1)/10)+2; j++) {
                $.ajax({
                    method: "GET",
                    url: list_url+"&openStartDt="+ i +"&openEndDt="+i+"&curPage="+j+"&repNationCd="+country,
                    dataType:"json",
                    success:function(data) {
                        console.log(data);

                        //10개씩 읽어온 정보가 data에 들어있음.
                        for(let k=0; k<data.movieListResult.movieList.length; k++){
                            if(sel_genre.includes(data.movieListResult.movieList[k].repGenreNm))
                            { // 해당 장르에 포함되면 개수를 1증가.
                                result[i-start_year] += 1;
                            }
                            check_cnt++;                         
                            if (check_cnt == sum_cnt){
                                draw(label_str,'bar');
                            }
                        }
                    }
                    
                })
            }
        }
    }
}

function nation(start_year,end_year,sel_genre){  // 국가별 분류는 나라 필요없음 인자로. 항상 전체로 설정되게 함.
    // 국가별로 분류...
    // 기준은 임의로 정하자 몇몇개 나라들만.
    
    result=[0,0,0,0,0,0,0];
    standards = ['한국','미국','영국','인도','일본','중국','기타'];
    nation_Cd = ['22041011','22042002','22044010','22041007','22041008','22041009'];
    label_str='국가별 영화 수';
    totalcnt=[]; //장르 범주있을때, 각 나라별 영화 총 개수 저장.

    check_cnt=0;
    let sum2_cnt=0; //totalcnt의 합계

    if(sel_genre == '전체'){
        $.ajax({ // 전체 영화 수 
            method: "GET",
            url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year,
            dataType:"json",
            async:false,
            success:function(data) {
                console.log(data);
                result[6] = data.movieListResult.totCnt; // 기타에다가 전체 개수 넣어줌
            }
        })

        for(let i=0; i<6; i++) {
            $.ajax({
                method: "GET",
                url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&repNationCd="+nation_Cd[i],
                dataType:"json",
                success:function(data) {
                    console.log(data);
                    result[i] = data.movieListResult.totCnt; // 각 순서대로 전체 개수 넣어주고. 기타에서는 빼줌.
                    result[6] -= data.movieListResult.totCnt;
                    check_cnt++;
                    if (check_cnt == 6) {
                        draw(label_str,'bar');
                    }
                }       
            })
        }
    }
    else {
        result.pop();
        standards.pop();

        for(let i=0; i<6; i++) { // 각 국가별 전체 영화수 (페이지 돌릴 때 써야함.)
            $.ajax({
                method: "GET",
                url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&repNationCd="+nation_Cd[i],
                dataType:"json",
                async: false,
                success:function(data) {
                    console.log(data);
                    totalcnt[i] = data.movieListResult.totCnt; // 각 순서대로 전체 개수 넣어주고. 기타에서는 빼줌.
                    sum2_cnt += totalcnt[i]; // 모든 영화수,.. 그릴 타이밍 조절 ㅇ용도
                }       
            })
        }

        // 이제 장르 포함인지 체크 합시다.
        for(let i=0; i<6; i++) { //각 나라 마다
            for(let j=1; j<Math.floor((totalcnt[i]-1)/10)+2; j++) { //전체 페이지 돌면서
                $.ajax({
                    method: "GET",
                    url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&repNationCd="+nation_Cd[i]+"&curPage="+j,
                    dataType:"json",
                    success:function(data) {
                        console.log(data);
    
                        //10개씩 읽어온 정보가 data에 들어있음.
                        for(let k=0; k<data.movieListResult.movieList.length; k++){
                            if(sel_genre.includes(data.movieListResult.movieList[k].repGenreNm))
                            { // 해당 장르에 포함되면 result를 1증가.
                                result[i] += 1;
                            }
                            check_cnt++;                         
                            if (check_cnt == sum2_cnt){
                                draw(label_str,'bar');
                            }
                        }
                    }       
                })
            
            }
        }
    }
}

function genre(start_year,end_year,sel_genre,country) {
    result=[0,0,0,0,0,0,0]; //최대ㅐ 7개니까.
    standards=[];
    label_str = '장르별 영화 수';

    check_cnt=0;


    if(sel_genre=='전체'){
        standards=['애니메이션','스릴러','코미디','SF','드라마','그 외'];
    }
    else {
        standards=sel_genre;
        standards.push('그 외');
        result.length = sel_genre.length+1;
    }

    $.ajax({
        method: "GET",
        url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&repNationCd="+country,
        dataType:"json",
        async:false,
        success:function(data) {
            console.log(data);
            totalcnt = data.movieListResult.totCnt;
            result[standards.length-1]=totalcnt;
            console.log(totalcnt);
        }
    })

    for(let i=1; i <Math.floor((totalcnt-1)/10)+2; i++) {
        $.ajax({
            method: "GET",
            url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&curPage="+i+"&repNationCd="+country,
            dataType:"json",
            success:function(data) {
                console.log(data);

                //10개씩 읽어온 정보가 data에 들어있음.
                for(let j=0; j<data.movieListResult.movieList.length; j++){

                    if(standards.includes(data.movieListResult.movieList[j].repGenreNm))
                    { // 해당 장르에 포함되면 개수를 1증가.
                        result[standards.indexOf(data.movieListResult.movieList[j].repGenreNm)] += 1;
                        console.log(data.movieListResult.movieList[j].repGenreNm);
                        result[standards.length-1] -= 1;
                    }
                    check_cnt++;                         
                    if (check_cnt == totalcnt){
                        draw(label_str,'bar');
                    }
                }
               
            }
        })

    }

}


// 관람 등급별 영화~~~~ 
    // 관람 등급이 총 뭐뭐가 있을까.. 이건 세부 정보 봐야 있네 ㅜ ㅜ ㅜ ㅜ
    // data.movieInfoResult.movieInfo.audits[0].watchGradeNm = "12세이상관람가" 청소년관람불가 전체관람가 12 15 
    // 근데 이거 하나하나 체크해야해서 2만번이상의 ajax!로 오류 나기도 함.. .. . 기간을 1년으로 하든. .흠 고민 사항.
    // 그래서 위의 ajax문을 async false로 해주고 밑에애들만 비동기로 진행? 너무 느림..


function rank(start_year,end_year,sel_genre,country){
    
    result=[0,0,0,0];
    standards=['전체관람가','12세이상관람가','15세이상관람가','청소년관람불가'];
    label_str = '관람 등급별 영화 수';
    
    check_cnt=0;

    // 일단 전체 개수를 가져와서 totalcnt에 페이지수 를 정해주고.
    $.ajax({
        method: "GET",
        url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&repNationCd="+country,
        dataType:"json",
        async:false,
        success:function(data) {
            totalcnt = data.movieListResult.totCnt;
            console.log(totalcnt);
        }
    })

    for(let i=1; i <Math.floor((totalcnt-1)/10)+2; i++) { //각 페이지를 돌면서
        $.ajax({
            method: "GET",
            url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&curPage="+i+"&repNationCd="+country,
            dataType:"json",
            success:function(data) {

                //10개씩 읽어온 정보가 data에 들어있음.
                for(let j=0; j<data.movieListResult.movieList.length; j++){
                    //이게 각 정보를 돌면서 또 ajax요청을 해야함..
                    $.ajax({
                        method: "GET",
                        url: info_url+"&movieCd="+data.movieListResult.movieList[j].movieCd,
                        dataType:"json",
                        success:function(data1) {
                            if (sel_genre != '전체' && !sel_genre.includes(data.movieListResult.movieList[j].repGenreNm)){
                                // 전체가 아닐 땐, 장르 안에 존재안하면 개수 카운팅 안해!
                            }
                            else{ //전체거나, 전체아니지만 장르에 속할 때는 추가 해야지.
                                result[standards.indexOf(data1.movieInfoResult.movieInfo.audits[0].watchGradeNm)] += 1; // 그 등급이..몇번째냐.
                            }
                           
                            check_cnt++;    // 검사할때마다 하나하나 증가 시키고!
                            if (check_cnt == totalcnt){ 
                                draw(label_str,'bar');
                            }                      
                        },
                        error:function(data3){
                            if(!alert_err){
                                alert_err = true;
                                alert('너무 많은 정보를 요청합니다.');
                                window.location.reload();
                            }
                        }
                    })
                }
            }
        })
    }
}
//console.log("draw() function");

function draw(label_str,shape) {
    // 그래프로 표현 하기.
    if(first_time){
        first_time = false;
        console.log(first_time);
    }
    else{
        myLineChart.destroy();
        console.log(first_time);
    }

    myLineChart = new Chart(document.getElementById('line-chart').getContext('2d'),{
        type : shape,
        data : {
            labels : standards,
            datasets : [
                {
                    label :label_str,
                    data: result,
                    backgroundColor: 'rgba(255,255,255, 0.335)',
                    borderColor: 'rgba(255, 192, 56, 0.335)',
                    borderWidth : 2
                }]
            },
        options : {
            maintainAspectRatio : false, // 기본 비율 유지
            bezierCurve: true
        }
    });

}

// 그래프 모양 바뀔 때마다 바꿔주기
function shape(nothing) {
    if (first_time){
        return;
    }
    let graph = $("input[name='chart']:checked").val(); // 그래프 모양
    draw(label_str,graph);
}




// 장르 범주 없으면 기타 항목 있을 수 있어

// function nation(start_year,end_year,sel_genre){  // 국가별 분류는 나라 필요없음 인자로. 항상 전체로 설정되게 함.
//     // 국가별로 분류...
//     // 기준은 임의로 정하자 몇몇개 나라들만.
    
//     result=[0,0,0,0,0,0,0];
//     standards = ['한국','미국','영국','인도','일본','중국','기타'];
//     nation_Cd = ['22041011','22042002','22044010','22041007','22041008','22041009'];
//     label_str='국가별 영화 수';

//     check_cnt=0;

//     $.ajax({ // 전체 영화 수 
//         method: "GET",
//         url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year,
//         dataType:"json",
//         async:false,
//         success:function(data) {
//             console.log(data);
//             result[6] = data.movieListResult.totCnt; // 기타에다가 전체 개수 넣어줌
//         }
//     })

//     for(let i=0; i<6; i++) {
//         $.ajax({
//             method: "GET",
//             url: list_url+"&openStartDt="+ start_year +"&openEndDt="+end_year+"&repNationCd="+nation_Cd[i],
//             dataType:"json",
//             success:function(data) {

//                 if(sel_genre == '전체'){ // 장르 전체면 그냥 개수만 가져오면 끝나.!
//                     console.log(data);
//                     result[i] = data.movieListResult.totCnt; // 각 순서대로 전체 개수 넣어주고. 기타에서는 빼줌.
//                     result[6] -= data.movieListResult.totCnt;
//                     check_cnt++;
//                     if (check_cnt == 6) {
//                         draw(label_str,'bar');
//                     }
//                 }
//                 else { // 가져온것

//                 }



               
//             }       
//         })
//     }
// }