// 버튼 누르면 바로 실행되는 부분.
// 연도별은 기본으로 출력


// 나라는 국가명 리스트랑 국가코드 리스트를 같이 넘겨줘야겠네..
$("#display").click(function () { 
    // 1. 기준
    let standard = $("input[name='standard']:checked").val();  

    // 2. 범주 [시작년도, 끝년도, 국가리스트, 장르리스트]
    let start_year =  $("#start").val(); // 시작
    let end_year = $("#end").val(); // 끝

    let nNm = [];
    let nCd = [];
    if ($("input:checkbox[name=countryAll]").is(":checked") == true)  { 
        nNm = '전체';
    }
    else {
        const checkboxes = document.querySelectorAll('input[name="country"]');

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked){
                nNm.push(checkbox.id); // 이러면 이제 각 국가 이니셜 들어감.
                nCd.push(checkbox.value); // 이러면 이제 각 국가 코드가 들어감.
            }
        })
    }

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

    console.log(start_year,end_year,nNm,nCd,sel_genre);
    switch(standard){
        case '장르별':
            genre(start_year,end_year,nCd,sel_genre); // 장르는 그냥 코드만 넘겨줘도 됨.
            break;
        case '국가별':
            nation(start_year,end_year,nNm,nCd,sel_genre);
            break;
    }
})

$("#save_image").click(function () { 
    test();
})



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



// 장르에서 전체 누르면 다 체크 되고 나머지 누르면 전체 해제하기.
function selectAll2(selectAll)  {
    const checkboxes 
        = document.querySelectorAll('input[name="country"]');
    
    checkboxes.forEach((checkbox) => {
        checkbox.set
        checkbox.checked = selectAll.checked
    })
}

// 이제 다른거 누르면 전체 선택이 해제 되기. & 다 선택되면 전체도 체크되게 하기.
function check2(box)  {
    var selAll2 = document.getElementById('coun_all');
    const checkboxes  = document.querySelectorAll('input[name="country"]');
    
    selAll2.checked = true; 

    checkboxes.forEach((checkbox) => {
        if(!checkbox.checked) {
            selAll2.checked = checkbox.checked;
        }
    })
}



