drawGraph();

$(function () {
    const X_VALUES = [-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0];
    const Y_MIN = -3, Y_MAX = 5;
    const R_VALUES = [1, 1.5, 2, 2.5, 3];

    let xval;
    let yval;
    let rval;

    let info = $('.input_form_info');

    drawDataOnGraph();

    function isNumeric(x) {
        return !isNaN(parseFloat(x)) && isFinite(x);
    }


    function validateX() {

        if (isNumeric(xval) && X_VALUES.includes(parseFloat(xval))) {
            return true;
        } else {
            info.text('Select value X')
            return false;
        }
    }


    function validateY() {
        yval = $('.input_form_inputText').val();

        if (isNumeric(yval) && yval >= Y_MIN && yval <= Y_MAX) {
            return true;
        } else {
            info.text(`Wrong data!\n Enter a Y value from ${Y_MIN} to ${Y_MAX}`)
            return false;
        }
    }


    function validateR() {
        rval = $('.input_form_selectOneMenu option:selected').val();

        if (isNumeric(rval) && R_VALUES.includes(parseFloat(rval))) {
            return true;
        } else {
            info.text('Select R')
            return false;
        }
    }


    function validateForm() {
        return validateX() && validateY() && validateR();
    }


    function drawDataOnGraph() {
        // drawGraph();
        let rows = [];
        let headers = $(".result_table th");
        $(".result_table tbody tr").each(function (index) {
            let cells = $(this).find("td");
            rows[index] = {};
            cells.each(function (cellIndex) {
                let a = $(this).html().replace(/\s/g, "");
                if (a) {
                    rows[index][$(headers[cellIndex]).html()] = a;
                } else {
                    rows.splice(index, 1);
                }

            });
        });
        drawGraph();

        for (let i = 0; i < rows.length; i++) {
            console.log("rows element " + i + " =" + rows[i]['X'] + ", " + rows[i]['Y'] + ", " + rval + ", " + rows[i]['Result']);
            let hit= rows[i]['Result'];
            if(hit=="false"){
                hit=false;
            }else{
                hit=true;
            }

            if(rval==undefined){
                drawPointOnGraph(
                    rows[i]['X'],
                    rows[i]['Y'],
                    rows[i]['R'],
                    hit);
            }else{
                drawPointOnGraph(
                    rows[i]['X'],
                    rows[i]['Y'],
                    rval,
                    hit);
            }

        }


    }

    function isHit(){
        return (xval >= 0 && yval >= 0 && yval<=-xval+0.5) || (xval<=0 && yval>=0 && (xval*xval)+(yval*yval)<=(rval/2)*(rval/2)) || (xval<=0 && yval<=0 && xval<=rval && yval<=rval);
    }

    $('.input_form_commandButton').on('click', function (event) {
        xval = $(this).val();
        if (!validateX()) return;

        $(this).addClass('input_form_commandButton_clicked');
        $('.input_form_commandButton').not(this).removeClass('input_form_commandButton_clicked');
        $('.input_form_hidden_x input[type=hidden]').val(xval);
    });

    $('.input_form_inputText').on('input', function (event) {
        yval = $(this).val();
    });

    $('.input_form_selectOneMenu').on('change', function (event) {
        rval = $('.input_form_selectOneMenu option:selected').val();
        // drawDataOnGraph();
    });

    $('.button_for_send_data').on('click', function (event) {
        yval=$('.input_form_inputText').val()
        yval = yval.replace(",", ".");
        if (!validateForm()) {
            event.preventDefault();
        } else {
            $('.input_form_hidden_x input[type=hidden]').val(xval);
            drawDataOnGraph();
            drawPointOnGraph(xval, yval, rval, isHit());
        }
    });

    $('.button_for_clean_result').on('click', function (event) {
        drawGraph();
    });



});