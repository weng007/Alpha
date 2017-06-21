function ChangeformatDate(val, mode) {
    var ManDate = val;

    //Update
    if (mode == 1) {
        var dateParts = ManDate.split("/");
        if (dateParts.length != 3)
            return null;
        var year = dateParts[2];
        var month = dateParts[1];
        var day = dateParts[0];

        var d = new Date();
        d.setYear = year;
        d.setMonth = month;
        d.setDate = day;

        var mDate = year + '/' + month + '/' + day;
    }
    else {//GetData
        var JobDate = new Date(ManDate);
        mDate = $.datepicker.formatDate('dd/mm/yy', JobDate);
    }
    return mDate;
}