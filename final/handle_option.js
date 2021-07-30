// 버튼 누르면 바로 실행되는 부분.
// 연도별은 기본으로 출력

$(document).ready(function() { 
    $("#sel_genre").find(':input').prop('disabled', true);
    $('#sel_genre a').click(function(e) {
        e.preventDefault();
    })
    $("#sel_type").find(':input').prop('disabled', true);
    $('#sel_type a').click(function(e) {
        e.preventDefault();
    })
})

let standard; // 엑셀로 변환할 때 써야해서 전역변수 처리 해줌.
let start_year;
let end_year;

$("#display").click(function () { 
    // 0. 로딩화면 띄우기.
    showLayer(); 

    // 1. 기준
    standard = $("input[name='standard']:checked").val();  

    // 2. 범주 [시작년도, 끝년도, 국가리스트, 장르리스트, 유형리스트]
    start_year =  $("#start").val(); // 시작
    end_year = $("#end").val(); // 끝

    let nNm = [];
    let nCd = [];
    if ($("input:checkbox[name=countryAll]").is(":checked") == true)  { 
        nNm = ['한국', '미국', '영국', '일본', '중국', '전체'];
        nCd = ['22041011', '22042002', '22044010', '22041008', '22041009'];
    }
    else {
        const checkboxes = document.querySelectorAll('input[name="country"]');

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked){
                nNm.push(checkbox.id);  
                nCd.push(checkbox.value);  
            }
        })
        nNm.push('전체'); 
    }

    let sel_genre = [];
    if ($("input:checkbox[name=genreAll]").is(":checked") == true)  { 
        sel_genre = ['애니메이션', '스릴러', '코미디', 'SF', '드라마', '전체'];
    }
    else {
        const checkboxes = document.querySelectorAll('input[name="genre"]');

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked){
                sel_genre.push(checkbox.value);  
            }
        })
        sel_genre.push('전체');
    }

    let typeNm = [];
    let typeCd = [];
    if ($("input:checkbox[name=typeAll]").is(":checked") == true)  {  
        typeNm=['장편','단편','옴니버스','전체'];
        typeCd=['220101','220102','220103'];
    }
    else {
        const checkboxes = document.querySelectorAll('input[name="type"]');

        checkboxes.forEach((checkbox) => {
            if(checkbox.checked){
                typeNm.push(checkbox.id);  
                typeCd.push(checkbox.value)
            }
        })
        typeNm.push('전체');  
    }

    console.log(start_year,end_year,nNm,nCd,sel_genre,typeNm);

    switch(standard){
        case '장르별':
            genre(sel_genre);  
            break;
        case '국가별':
            nation(nNm,nCd);
            break;
        case '유형별':
            type(typeNm,typeCd);
            break;
    }
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

// 유형에서 전체 누르면 다 체크 되고 나머지 누르면 전체 해제하기.
function selectAll3(selectAll)  {
    const checkboxes 
        = document.querySelectorAll('input[name="type"]');
    
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

// 이제 다른거 누르면 전체 선택이 해제 되기. & 다 선택되면 전체도 체크되게 하기.
function check3(box)  {
    var selAll = document.getElementById('type_all');
    const checkboxes  = document.querySelectorAll('input[name="type"]');
    
    selAll.checked = true; 

    checkboxes.forEach((checkbox) => {
        if(!checkbox.checked) {
            selAll.checked = checkbox.checked;
        }
    })
}

// 선택했을 때 불필요한 체크박스 비활성화 시키기.
$('#set-standard').click(function () {
    var radioVal = $('input[name="standard"]:checked').val();
    if (radioVal == '국가별') 
    {
        $("#sel_genre").find(':input').prop('disabled', true);
        $('#sel_genre a').click(function(e) {
            e.preventDefault();
        })
        $("#sel_type").find(':input').prop('disabled', true);
        $('#sel_type a').click(function(e) {
            e.preventDefault();
        })

        $('#sel_country').find(':input').prop('disabled', false);
        $('#sel_country a').unbind("click");
    }
    else if (radioVal == '장르별'){
        $("#sel_country").find(':input').prop('disabled', true);
        $('#sel_country a').click(function(e) {
            e.preventDefault();
        })
        $("#sel_type").find(':input').prop('disabled', true);
        $('#sel_type a').click(function(e) {
            e.preventDefault();
        })

        $('#sel_genre').find(':input').prop('disabled', false);
        $('#sel_genre a').unbind("click");
    }
    else {
        $("#sel_country").find(':input').prop('disabled', true);
        $('#sel_country a').click(function(e) {
            e.preventDefault();
        })
        $("#sel_genre").find(':input').prop('disabled', true);
        $('#sel_genre a').click(function(e) {
            e.preventDefault();
        })

        $('#sel_type').find(':input').prop('disabled', false);
        $('#sel_type a').unbind("click");
    }
});


function wrapWindowByMask() { //화면의 높이와 너비를 구한다. 
    $('#fade').css({ 'width': $('#result_chart').width(), 'height': $('#result_chart').height()}); 
}

/// 화면의 중앙에 레이어띄움 
function showLayer() { 
    wrapWindowByMask(); 
    $("#light").css("left", "20px"); 
    $('#fade').show(); $('#light').show(); 
} 
    
function close() { 
    $('#fade').hide(); $('#light').hide(); 
}
