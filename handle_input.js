 
// 사용자가 선택한 모든 것들을 정리해서 출력 함수를 호출해줄 것
$("#display").click(function () { 
    // 1. 기준
    let standard = $("input[name='standard']:checked").val(); // 장르별 연도별 뭐 이런거!

    // 2. 범주 [시작년도, 끝년도, 국가리스트, 장르리스트]
    let start_year =  $("#start").val(); // 시작
    let end_year = $("#end").val(); // 끝
    let country = $("select[name=set-country]").val();

    let sel_genre = [];
    if ($("input:checkbox[name=genreAll]").is(":checked") == true)  { // 전체에 체크가 되어있다면
        sel_genre.push('전체');
    }
    else {
        const checkboxes = document.querySelectorAll('input[name="genre"]');

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked){
                sel_genre.push(checkbox.value); // 이러면 이제 각 이름대로 들어감.
            }
        })
    }

    //console.log (standard+start_year+end_year+sel_genre+country);
    // 이제 기준에 따라 각각 함수를 실행해준다.
    switch(standard){
        case '연도별':
            year(start_year,end_year,sel_genre,country);
            break;
        case '장르별':
            genre(start_year,end_year,sel_genre,country);
            break;
        case '관람 등급별':
            rank(start_year,end_year,sel_genre,country);
            break;
        case '국가별':
            nation(start_year,end_year,sel_genre);
            break;
    }
})


// 연도별 선택하면 선 그래프 선택할 수 있도록 만들기
function lineGraph(nothing) {
    let line = document.getElementById('chart_line');
    let range_nation = document.getElementById('std_country')
    
    if( !document.getElementById('std_year').checked ){
        line.checked = false;
        line.disabled = true;
    }
    else{
        line.disabled = false;
    }

    if( range_nation.checked ){ //이건 이제 기준을 바꿨을 때 우선 전체로 바꿔주는거고.
        $('#set-country')[0].selectedIndex = 0;
    }
    
}


//이건 이제 국가를 선택했을때 국가별이면 안바뀌게
$('#set-country').change(function() { 
    let range_nation = document.getElementById('std_country')

    if( range_nation.checked ){
        $(this)[0].selectedIndex = 0;
    }
});


// 장르에서 전체 누르면 다 체크 되고 나머지 누르면 전체 해제하기.
function selectAll(selectAll)  {
    const checkboxes 
        = document.querySelectorAll('input[name="genre"]');
    
    checkboxes.forEach((checkbox) => {
        checkbox.set
        checkbox.checked = selectAll.checked
    })
}

// 이제 다른거 누르면 전체 선택이 해제 되기. & 다 선택되면 전체도 체크되게 하기.
function check(box)  {
    var selAll = document.getElementById('gen_all');
    const checkboxes  = document.querySelectorAll('input[name="genre"]');
    
    selAll.checked = true; 

    checkboxes.forEach((checkbox) => {
        if(!checkbox.checked) {
            selAll.checked = checkbox.checked;
        }
    })
}


