var excelHandler = {
    getExcelFileName : function(){
        return start_year+'_'+end_year+'_'+standard+'.xlsx';
    },
    getSheetName : function(){
        return start_year+'_'+end_year+'_'+standard+'.xlsx';
    },
    getExcelData : function(){
      
        let my_data = new Array(label.length+1);
        for (let i=0; i<label.length+1; i++) {
            my_data[i] = [];
        }

        for (let i=0; i<label.length+1; i++) {
            if(i==0){
                my_data[i].push(standard); // 유형 알려줌.
                my_data[i] = my_data[i].concat(standards);
            }
            else{
                my_data[i].push(label[i-1]);
                my_data[i] = my_data[i].concat(result[i-1]);
            }
        }

        return my_data;
    },
    getWorksheet : function(){
        return XLSX.utils.aoa_to_sheet(this.getExcelData());
    }
}

$("#save_xlsx").click( function() {
    exportExcel();
})


function exportExcel(){ 
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();

    // step 2. 시트 만들기 
    var newWorksheet = excelHandler.getWorksheet();
    
    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
}
 
function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}

$("#save_image").click( function() {

    html2canvas(document.querySelector("#result_chart")).then(canvas => {
        var myImage = canvas.toDataURL();
		downloadURI(myImage, start_year+'_'+end_year+'_'+standard+'+'+'.png'); 
    });

}) 

function downloadURI(uri, name){
	var link = document.createElement("a")
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
}