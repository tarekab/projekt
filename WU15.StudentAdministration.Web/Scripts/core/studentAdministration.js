//test

$(document).ready(function () {

    // Setup initial page parameters.
    Page.setup({
        numberOfColumnsPerRow: 3,
        studentsUrl: "http://localhost:45959/api/students/",
        coursesUrl: "http://localhost:45959/api/courses/",

        defaultPlaceholder: $("#defaultPlaceholder"),
        courseDetailsPlaceholder: $("#courseDetailsPlaceholder"),
        courseDetailsStudentListPlaceholder: $("#courseDetailsStudentListPlaceholder"),
        courseDetailsStudentSelectList: $("#courseDetailsStudentSelectList"),
        courseListPlaceholder: $("#courseListPlaceholder"),
        studentListPlaceholder: $("#studentListPlaceholder"),
        studentDetailsPlaceholder: $("#studentDetailsPlaceholder"),
       
        //studentEditForm: $("#studentEditForm"),
        //studentListAddForm:$("studentListAddForm")
    });

    // Do some page bootstrapping.
    Page.init();

    // Display course details for clicked course.
    $("#defaultPlaceholder").on("click", ".list-item", function (event) {
        var id = $(event.target).data("itemId");
        console.log("[#defaultPlaceholder.click]: Course list clicked: " + id);

        Page.displayCourseDetails(id);
    });

    $("#defaultPlaceholder").on("click", ".glyphicon-user", function (event) {
        var id = $(event.target).data("itemId");
        console.log("[#defaultPlaceholder.click]: Course list clicked: " + id);

        Page.displayStudentDetails(id);
    });

    // Cancel the course details view.
    $("#courseDetailsCancelButton").on("click", function (event) {
        console.log("[#courseDetailsCancelButton.click]: Course details canceled.");

        // De-scelect the top menu button.
        Page.deselectMenu();

        Page.displayDefault();
    });

    $("#studentDetailsCancelButton").on("click", function (event) {
        console.log("[#courseDetailsCancelButton.click]: Course details canceled.");

        // De-scelect the top menu button.
        
        
        Page.deselectMenu();

        Page.displayDefault();

    });

    // Save the course details.
    $("#courseDetailsForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseDetailsForm.submit]: Submitted course details form.");

        var course = Utilities.formToJson(this);
        course.students = [];
       
        var student = null;

        $(".registered-student").each(function () {
            student = {
                id: $(this).data("id"),
                firstName: $(this).data("firstName"),
                lastName: $(this).data("lastName"),
                studentPersNummer: $(this).data("student-persnummer"),
                aktiv: $(this).data("student-status")
            }
            course.students.push(student);
        });

        Page.saveCourseAndDisplayDefault(course);
    });

    // Remove a registered student.
    $("#courseDetailsStudentListPlaceholder").on("click", ".remove-registered-student", function (event) {
        var item = $(this).closest(".list-group-item")[0];

        // Append to the option list.
        var id = $(item).data("id");
        var firstName = $(item).data("firstName");
        var lastName = $(item).data("lastName");
        var studentPersNummer = $(item).data("student-persnummer");
        var aktiv = $(item).data("student-status");
       

        var student = { id: id, firstName: firstName, lastName: lastName, studentPersNummer: studentPersNummer,aktiv: aktiv }
        Page.appendStudentSelectOption(student);

        // Remove from the registered list.
        $(item).remove();
    });

    // Register a student.
    $("#registerSelectedStudentButton").on('click', function (event) {

        Page.registerSelectedStudent();

    });

    $('.nav li ,a').click(function (e) {
        $('.nav li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        e.preventDefault();
    });

    $(".navigation").on("click", function () {
        var panel = this.href.substr(this.href.indexOf("#") + 1);

        console.log(panel);

        Page.navigate(panel);
    });

    // Save the new course details from the course list view.
    $("#courseListAddCourseForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseListAddCourseForm.submit]: Submitted the new course form.");

        var course = Utilities.formToJson(this);
        course.students = [];
        $(this)[0].reset();

        Page.saveCourseDetails(course);
    });

    $("#studentDetailsForm").submit(function (event) {

           
        

        event.preventDefault();
        console.log("[courseListAddCourseForm.submit]: Submitted the new student.");

        var student = Utilities.formToJson(this);
        var course = Utilities.formToJson(this);
       // student.course = [];
        $(this)[0].reset();
        //configuration.studentListPlaceholder.hide();

       //Page.displayStudentList();
        // $("#studentListTable").hide();
            
            Page.saveStudentDetails(student);

           
           


    });
   

    $(document).on("courseSavedCustomEvent", function (event) {
        console.log("[courseSavedCustomEvent]: " + event.message.description);
        console.log("[courseSavedCustomEvent]: " + event.message.data);

        Page.displayCourseList();

    });

    $(document).on("studentSavedCustomEvent", function (event) {
        console.log("[studentSavedCustomEvent]: " + event.message.description);
        console.log("[studentSavedCustomEvent]: " + event.message.data);

        //Page.displayDefault();
            Page.displayStudentList();

    });



    $(document).on("studentSavedEditEvent", function (event) {
        console.log("[studentSavedEditEvent]: " + event.message.description);
        console.log("[studentSavedEditEvent]: " + event.message.data);

        //Page.displayDefault();
        Page.displayStudentEdit();

    });

    $("#studentListUp").click(function () {
        $("#studentListTable").slideUp();

    });


    $("#studentListDown").click(function () {
        $("#studentListTable").slideDown();

    });







    $("#studentListTable").on("click", ".glyphicon-pencil", function (event) {

        
        var id = $(event.target).data("editstudent");

        console.log("student clicked",id);
       


        Page.displayStudentEdit(id);
       
    });

    $("#studentListAddForm").submit(function (event) {

        
        event.preventDefault();
        console.log("[studentlist.submit]: Submitted student details form.");

        var student = Utilities.formToJson(this);
        

        $(this)[0].reset();
        
        Page.saveStudentAndDisplayDefault(student);
           
       // Page.displayStudentEdit();



    });

    


    //$("#studentListTable").on("click", ".glyphicon-remove-sign", function (event) {


    //    var id = $(event.target).data("inaktifstudent");

    //    console.log("student clicked", id);

    //   var student = Utilities.formToJson(this);


    //    //$(this)[0].reset();

        

    //  Page.displayStudentStatus(id);
    //     Page.saveStudentStatus(student);

    //});

    $("#courseListTable").on("click", ".btn-warning", function (event) {
        //$('.btn-danger').removeClass('btn-success').addClass('btn-primary ');
        var id = $(event.target).data("inactifcourse");

        var course = Utilities.formToJson(this);       
            console.log("clicked " + id);
            $(this).addClass('btn-success');
            $(this).text("Aktivera");
            event.preventDefault();
            console.log("[studentlist.submit]: Submitted student details form.");
            console.log("Course clicked", id);
            var status = false;
            Page.displayCourseStatus(id, status);

  });


        $("#courseListTable").on("click", ".btn-success", function (event) {
        //$('.btn-danger').removeClass('btn-success').addClass('btn-primary ');
        var id = $(event.target).data("actifcourse");

        var course = Utilities.formToJson(this);
            $(this).addClass('btn-warning');
            $(this).text("Avaktivera");
            event.preventDefault();
            console.log("[studentlist.submit]: Submitted student details form.");
            console.log("Course clicked", id);
            var status = true;
            Page.displayCourseStatus(id, status);




        


    });
   

       
        $("#studentListTable").on("click", ".btn-warning", function (event) {
            //$('.btn-danger').removeClass('btn-success').addClass('btn-primary ');
             var id = $(event.target).data("inaktifstudent");
             var student = Utilities.formToJson(this);

             
             $(this).addClass('btn-success');
             $(this).text("Aktivera");
            
            event.preventDefault();
            console.log("[studentlist.submit]: Submitted student details form.");
             console.log("student clicked", id);
           
            var status = false;
            Page.displayStudentStatus(id,status);         
           
           
           
           

        });
        




        $("#studentListTable").on("click", ".btn-success", function (event) {
            //$('.btn-danger').removeClass('btn-success').addClass('btn-primary ');
            var id = $(event.target).data("aktifstudent");

            var course = Utilities.formToJson(this);
            $(this).addClass('btn-warning');
            $(this).text("Avaktivera");
            event.preventDefault();
            console.log("[studentlist.submit]: Submitted student details form.");
            console.log("Student clicked", id);
            var status = true;
            Page.displayStudentStatus(id, status);


        });

});





