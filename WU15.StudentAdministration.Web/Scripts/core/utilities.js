﻿

//Disable submit button when there is no data to save
//$(document).ready(function () {
//    $('button[type="submit"]').prop('disabled', true);
//    $('.form-group').keyup(function () {
//        if ($(this).val() != '') {
//            $('button[type="submit"]').prop('disabled', false);
//        }
//    });
//});
/////////////////////


var Utilities = new function Utilities() {

    Utilities.formToJson = function (form) {
        var jsonForm = {};
        $("input", $(form)).each(function (index) {
            jsonForm[$(this).attr("name")] = this.value;


        });

        return jsonForm;
    }

    return Utilities;

}





var Page = new function Page() {
    var configuration = null;

    // Initial setup.
    Page.setup = function (config) {
        configuration = config;
    }




    // Initial rendering.

    Page.init = function () {
        Page.navigate("start");
    }



    // Fetch and display all courses.
    Page.displayDefault = function () {
        configuration.courseDetailsPlaceholder.hide();

        $.ajax({
            type: "GET",
            url: configuration.coursesUrl
        }).done(function (data) {

            // Render the courses.
            Page.renderDefault(data);

        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });

    }

    // Fetch the data and delegate the rendering of the page.
    Page.displayCourseList = function () {

        $.ajax({
            type: "GET",
            url: configuration.coursesUrl
        }).done(function (data) {
            console.log("[Page.displayCourseList]: Number of items returned: " + data.length);

            // Render the courses.
            Page.renderCourseList(data);

        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });
    }

    // Fetch the data and render the page.
    Page.displayStudentList = function () {

        $.ajax({
            type: "GET",
            url: configuration.studentsUrl
        }).done(function (data) {
            console.log("[Page.displayStudentList]: Number of students returned: " + data.length);
            //console.log("[Page.displayStudentList]: Number of students returned: " + data.id);
            // Render the courses.

            //var data = {}
            Page.renderStudentList(data);
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });


    }

    Page.displayStudentEdit = function (id) {

        $.ajax({
            type: "GET",
            url: configuration.studentsUrl + id
        }).done(function (data) {
            console.log("[Page.displayStudentList]: Number of students returned: " + data.id);
            //console.log("[Page.displayStudentList]: Number of students returned: " + data.id);
            // Render the students.

            //var data = {}

            Page.renderStudentEdit(data);
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });
    }

    Page.displayStudentStatus = function (id) {

        $.ajax({
            type: "GET",
            url: configuration.studentsUrl + id
        }).done(function (data) {
            console.log("[Page.displayStudentList]: Number of students returned: " + data.id);
            //console.log("[Page.displayStudentList]: Number of students returned: " + data.id);
            // Render the courses.

            //var data = {}

            Page.renderStudentStatus(data);
        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });
    }

    Page.renderDefault = function (courses) {
        var view = "";
        configuration.defaultPlaceholder.empty();

        var courseIndex = 0;
        for (var contentIndex = 0; contentIndex < courses.length; contentIndex = contentIndex + configuration.numberOfColumnsPerRow) {
            var item = "<div class='row list-item'>";

            var tempCourseIndex = courseIndex;
            if ((tempCourseIndex + configuration.numberOfColumnsPerRow) > courses.length) {
                tempCourseIndex = courses.length;
            } else {
                tempCourseIndex = tempCourseIndex + configuration.numberOfColumnsPerRow;
            }

            // Iterate the courses.
            // Calculate witch bootstrap class to use. 
            // Bootstrap uses a 12 column grid system. 
            var bootstrapColumns = 12 / configuration.numberOfColumnsPerRow;
            for (; courseIndex < (tempCourseIndex) ; courseIndex++) {

                if (courses[courseIndex].aktiv === true) {

                    item += "<div class='col-md-" + bootstrapColumns + "'>";
                    item += "<div class='list-group'>";
                    item += "<a href='#' class='list-group-item active data-course-item' data-item-id='"
                        + courses[courseIndex].id + "'>"

                        + "<span class='list-group-addon glyphicon glyphicon-edit'></span>&nbsp;" // The edit icon.
                        + courses[courseIndex].name



                        + "</a>";
                    item += "<b>" + "<p class='list-group-item course-item-info'>Kursstart " + courses[courseIndex].term + " " + courses[courseIndex].year + " </p>" + "</b>";

                    // Students
                    if (courses[courseIndex].students.length > 0) {


                        for (var subIndex = 0; subIndex < courses[courseIndex].students.length; subIndex++) {


                            if (courses[courseIndex].students[subIndex].aktiv === true) {
                                item += "<a href='#' class='list-group-item'>" + "<span class='glyphicon glyphicon-user'></span> " + courses[courseIndex].students[subIndex].firstName + " " + courses[courseIndex].students[subIndex].lastName + " " + courses[courseIndex].students[subIndex].studentPersNummer + "</a>";

                            }


                            if (courses[courseIndex].students[subIndex].aktiv === false) {

                                $("glyphicon-user").css("color", "red");
                                item += "<a href='#' class='list-group-item'>" + "<span class='glyphicon  glyphicon-remove-sign'></span>" + courses[courseIndex].students[subIndex].firstName + " " + courses[courseIndex].students[subIndex].lastName + " " + courses[courseIndex].students[subIndex].studentPersNummer + "</a>";





                            }
                        }
                    }

                    else {
                        item += "<span class='list-group-item'><b>Kursen har inga studenter registrerade.</b></span>";
                    }
                }
                else {
                    item += "<div class='col-md-" + bootstrapColumns + "'>";
                    item += "<div class='list-group'>";
                    item += "<div class='list-group-item disabled' data-item-id='"
                        + courses[courseIndex].id + "'>"

                      //  + "<span class='list-group-addon glyphicon glyphicon-edit'></span>&nbsp;" // The edit icon.
                        + courses[courseIndex].name



                        + "</div>";
                    item += "<b>" + "<p class='list-group-item disabled course-item-info'>Kursstart " + courses[courseIndex].term + " " + courses[courseIndex].year + " </p>" + "</b>";

                    // Students
                    if (courses[courseIndex].students.length > 0) {


                        for (var subIndex = 0; subIndex < courses[courseIndex].students.length; subIndex++) {


                            if (courses[courseIndex].students[subIndex].aktiv === true) {
                                item += "<a href='#' class='list-group-item disabled'>" + "<span class='glyphicon glyphicon-user'></span> " + courses[courseIndex].students[subIndex].firstName + " " + courses[courseIndex].students[subIndex].lastName + " " + courses[courseIndex].students[subIndex].studentPersNummer + "</a>";

                            }


                            if (courses[courseIndex].students[subIndex].aktiv === false) {

                               
                                item += "<a href='#' class='list-group-item '>" + "<span class='glyphicon  glyphicon-remove-sign'></span>" + courses[courseIndex].students[subIndex].firstName + " " + courses[courseIndex].students[subIndex].lastName + " " + courses[courseIndex].students[subIndex].studentPersNummer + "</a>";





                            }
                        }
                    }

                    else {
                        item += "<span class='list-group-item'><b>Kursen har inga studenter registrerade.</b></span>";
                    }


                }

                item += "</div>";
                item += "</div>";
            }

            item += "</div>";
            view += item;
        }


        // Append the html content to the div.
        configuration.defaultPlaceholder.append(view);

        // Display the content.



        configuration.defaultPlaceholder.fadeIn(1000);
    }

    Page.renderCourseList = function (courses) {
        var tbody = $("#courseListTable tbody");
        tbody.empty();

        var html = "";
        for (var index = 0; index < courses.length; index++) {

            html += "<tr>";
            html += "<td>" + courses[index].name + "</td>";
            html += "<td>" + courses[index].credits + "</td>";
            html += "<td>" + courses[index].students.length + "</td>";
            html += "<td>" + courses[index].aktiv + "</td>";
            html += "<td>" + " <button id='inactifCourse' type= button' class='btn btn-warning'>Avaktivera</button>" + "</td>";
            html += "</tr>";


        }
        tbody.append(html);


        $(function () {

            var $list = $("#courseListTable tbody");

            $list.children().detach().sort(function (a, b) {
                return $(a).text().localeCompare($(b).text());
            }).appendTo($list);

        });
        configuration.courseListPlaceholder.fadeIn(500);

    }

    Page.renderStudentList = function (student) {
        //configuration.studentListPlaceholder.empty();

        var tbody = $("#studentListTable tbody");
        tbody.empty();

        var html = "";
        for (var index = 0; index < student.length; index++) {

            html += "<tr>";
            html += "<td>" + student[index].firstName + "</td>";
            html += "<td>" + student[index].lastName + "</td>";
            html += "<td>" + student[index].id + "</td>";
            html += "<td>" + student[index].studentPersNummer + "</td>";
           
            html += "<td>" + " <button data-inactifButton="+student[index].id +" type= button' class='btn btn-warning'>Avaktivera</button></span>" + " " + student[index].aktiv + "</td>";
           // html += "<td>" + "<span data-inaktifstudent=" + student[index].id + " class='glyphicon  glyphicon-remove-sign'></span>" + student[index].aktiv + "</td>";
            html += "<td>" + "<span data-editstudent=" + student[index].id + " class='glyphicon glyphicon-pencil'></span>" + "</td>";

            html += "</tr>";

        }
        tbody.append(html);


        //Sorter Student by Name
        $(function () {

            var $list = $("#studentListTable tbody");

            $list.children().detach().sort(function (a, b) {
                return $(a).text().localeCompare($(b).text());
            }).appendTo($list);

        });
        configuration.studentListPlaceholder.fadeIn(500);
    }

    Page.displayCourseDetails = function (id) {
        console.log("[Page.displayCourseDetails]: Fetching item having id: " + id);

        $.ajax({
            type: "GET",
            url: configuration.coursesUrl + id
        }).done(function (data) {

            console.log(data);

            Page.renderCourseDetails(data);

        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });
    }



    Page.renderStudentEdit = function (student) {
        // Hide the default view.
        configuration.defaultPlaceholder.hide();
        //configuration.studentListPlaceholder.hide();
        // Map all form values from the course object to the form.
        var form = configuration.studentListPlaceholder.find("form")[0];
        $(form["id"]).val(student.id);
        $(form["firstName"]).val(student.firstName);
        $(form["lastName"]).val(student.lastName);
        $(form["studentPersNummer"]).val(student.studentPersNummer);
        $(form["studentStatus"]).val(student.aktiv);
    }
        
    Page.renderStudentStatus = function (student) {
        var form = configuration.studentListPlaceholder.find("form")[0];
        $(form["id"]).val(student.id);
        $(form["firstName"]).val(student.firstName);
        $(form["lastName"]).val(student.lastName);
        $(form["studentPersNummer"]).val(student.studentPersNummer);
       // $(form["studentStatus"]).val(false);

        // Hide the default view.
        configuration.defaultPlaceholder.hide();
        //configuration.studentListPlaceholder.hide();
        // Map all form values from the course object to the form.


    }


    Page.renderCourseDetails = function (course) {
        // Hide the default view.
        configuration.defaultPlaceholder.hide();
        //configuration.studentListPlaceholder.hide();
        // Map all form values from the course object to the form.
        var form = configuration.courseDetailsPlaceholder.find("form")[0];
        $(form["id"]).val(course.id);
        $(form["name"]).val(course.name);
        $(form["credits"]).val(course.credits);
        $(form["year"]).val(course.year);
        $(form["term"]).val(course.term);

        // Set the details panel top header text.
        $(form).find('[name=title]').text(course.name);

        // Render the registered students.
        Page.renderCourseDetailsStudentList(course);

        // Render and fill the student select list.
        Page.renderCourseDetailsStudentSelectList();

        // Display the details panel.
        configuration.courseDetailsPlaceholder.fadeIn(500);
    }





    Page.renderStudentDetails = function (student) {
        // Hide the default view.
        //configuration.defaultPlaceholder.hide();


        // Display the details panel.
        configuration.studentDetailsPlaceholder.fadeIn(500);
    }

    Page.renderCourseDetailsStudentList = function (course) {
        configuration.courseDetailsStudentListPlaceholder.empty();
        if (course.students.length) {
            for (var index = 0; index < course.students.length; index++) {
                configuration.courseDetailsStudentListPlaceholder.append(
                    "<div class='list-group-item registered-student' data-id='"
                    + course.students[index].id
                    + "' data-first-name='"
                    + course.students[index].firstName
                    + "' data-last-name='"
                    + course.students[index].lastName
                    + "' data-student-persnummer='"
                    + course.students[index].studentPersNummer
                    + "' data-student-status='"
                    + course.students[index].aktiv
                    + "'>"
                    + course.students[index].firstName
                    + " "
                    + course.students[index].lastName
                    + " "


                    + course.students[index].studentPersNummer





                    // Render the trash can, the remove student button.
                    + "<span class='pull-right'><button class='remove-registered-student btn btn-xs btn-warning'><span class='glyphicon glyphicon-trash'></span></button></span>"

                    + "</div>");
            }
        } else {
            configuration
                .courseDetailsStudentListPlaceholder
                .append("<div><b><i>Inga studenter registrerade.</i></b></div>");
        }
    }

    Page.renderCourseDetailsStudentSelectList = function () {

        $.ajax({
            type: "GET",
            url: configuration.studentsUrl
        }).done(function (data) {

            configuration.courseDetailsStudentSelectList.empty();
            $.each(data, function () {
                Page.appendStudentSelectOption(this);
            });

        }).error(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText || textStatus);
        });

    }
   
    Page.appendStudentSelectOption = function (student) {
        var name = student.firstName + " " + student.lastName + " " + student.studentPersNummer + " " + student.aktiv;
        configuration.courseDetailsStudentSelectList.append(
            $("<option />")
            .text(name)
            .attr("data-id", student.id)
            .attr("data-first-name", student.firstName)
            .attr("data-last-name", student.lastName)
            .attr("data-student-persnummer", student.studentPersNummer)
            .attr("data-student-status", student.aktiv));

    }

    // Saves a course and displays the default view.
    Page.saveCourseAndDisplayDefault = function (course) {

        $.ajax({
            url: configuration.coursesUrl,
            type: "POST",
            data: JSON.stringify(course),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log("[Page.saveCourseAndDisplayDefault.success]: Results: " + data);

                // De-scelect the top menu button.
                Page.deselectMenu();

                // Display the default contents.
                Page.displayDefault();
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    }


    Page.saveStudentAndDisplayDefault = function (student) {

        $.ajax({
            url: configuration.studentsUrl  ,
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                // configuration.studentListPlaceholder.fadeIn(500);

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    }
    Page.saveStudentStatus = function (student) {

        $.ajax({
            url: configuration.studentsUrl,
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                // student.aktiv = false;

            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    }

    // Saves a course and does'nt do a view update.
    Page.saveCourseDetails = function (course) {




        $.ajax({
            url: configuration.coursesUrl,
            type: "POST",
            data: JSON.stringify(course),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log("[Page.saveCourseDetails.success]: Results: " + data);

                // Brodcast course added event.
                $.event.trigger({
                    type: "courseSavedCustomEvent",
                    message: { description: "Saved a course.", data: course },
                    time: new Date()
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    }

    Page.saveStudentDetails = function (student) {

        $.ajax({
            url: configuration.studentsUrl,
            type: "POST",
            data: JSON.stringify(student),
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log("[Page.saveStudentDetails.success]: Results: " + data);

                // Brodcast student added event.
                $.event.trigger({
                    type: "studentSavedCustomEvent",
                    message: { description: "Save a student.", data: student },
                    time: new Date()



                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    }








    Page.appendStudentToList = function (student) {
        configuration.courseDetailsStudentListPlaceholder.append(
                    "<div class='list-group-item registered-student' data-id='"
                    + student.id
                    + "' data-first-name='"
                    + student.firstName
                    + "' data-last-name='"
                    + student.lastName
                    + "' data-student-persnummer='"
                    + student.studentPersNummer
                    + "' data-student-status='"
                    +  student.aktiv
                    + "'>"
                    + student.firstName
                    + " "
                    + student.lastName
                    + " "
                    + student.studentPersNummer
                    






                    // Render the trash can remove student button.
                    + "<span class='pull-right'><button class='remove-registered-student btn btn-xs btn-warning'><span class='glyphicon glyphicon-trash'></span></button></span>"

                    + "</div>");
    }

    Page.getCourseTemplate = function () {
        var course = {
            id: 0,
            name: "",
            credits: 0,
            students: [],
            aktiv: true
        }

        return course;
    }

    Page.getStudentTemplate = function () {
        var student = {
            id: 0,
            firstName: "",
            lastName: "",
            studentPersNummer: "",
            aktiv: true
        }

        return student;
    }


    Page.registerSelectedStudent = function () {
        var selectedStudentOption
            = configuration
                .courseDetailsStudentSelectList
                .find('option:selected');
        var id = selectedStudentOption.data("id");
        var firstName = selectedStudentOption.data("firstName");
        var lastName = selectedStudentOption.data("lastName");
        var studentPersNummer = selectedStudentOption.data("student-persnummer");
        var aktiv = selectedStudentOption.data("student-status");
        var student = { id: id, firstName: firstName, lastName: lastName, studentPersNummer: studentPersNummer,aktiv:aktiv }
        selectedStudentOption.remove();

        // Remove the empty list default text.
        var numberOfRegisteredStudents
            = configuration.courseDetailsStudentListPlaceholder
                .find(".registered-student")
                .length;

        if (numberOfRegisteredStudents === 0) {
            configuration.courseDetailsStudentListPlaceholder.empty();
            // $("#registerSelectedStudentButton").prop('disabled', true);
        }
      

        Page.appendStudentToList(student);

        console.log("Registring student having id " + id + ".");

    }

    Page.navigate = function (panel) {
        switch (panel) {
            case "start":
                configuration.courseDetailsPlaceholder.hide();
                configuration.courseListPlaceholder.hide();
                configuration.studentListPlaceholder.hide();
                configuration.studentDetailsPlaceholder.hide();

                Page.displayDefault();

                break;
            case "courses":
                configuration.courseDetailsPlaceholder.hide();
                configuration.defaultPlaceholder.hide();
                configuration.studentListPlaceholder.hide();
                configuration.studentDetailsPlaceholder.hide();
                Page.displayCourseList();

                break;
            case "students":
                configuration.courseDetailsPlaceholder.hide();
                configuration.defaultPlaceholder.hide();
                configuration.courseListPlaceholder.hide();
                configuration.studentDetailsPlaceholder.hide();
                Page.displayStudentList();

                break;
            case "addCourse":
                configuration.courseDetailsPlaceholder.hide();
                configuration.defaultPlaceholder.hide();
                configuration.courseListPlaceholder.hide();
                configuration.studentListPlaceholder.hide();
                configuration.studentDetailsPlaceholder.hide();
                var course = Page.getCourseTemplate();
                Page.renderCourseDetails(course);

                break;

            case "addStudent":
                configuration.courseDetailsPlaceholder.hide();
                configuration.defaultPlaceholder.hide();
                configuration.courseListPlaceholder.hide();
                configuration.studentListPlaceholder.hide();
                configuration.studentDetailsPlaceholder.hide();
                var student = Page.getStudentTemplate();
                Page.renderStudentDetails(student);



                break;

            default:
                configuration.courseDetailsPlaceholder.hide();

                Page.displayDefault();
        }
    }

    Page.deselectMenu = function () {

        $('.nav li.active').removeClass('active');
    }

    return Page;

}


