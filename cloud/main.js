// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var UserStatus = AV.Object.extend("userStatus");


AV.Cloud.afterSave("_User",function(request){
    console.log("A new user is created.");
    var user_id = request.object.id;
    var user_status = new UserStatus();
    var user_pointer = AV.Object.createWithoutData("_User", user_id);
    user_status.set("user", user_pointer);
    user_status.save().then(
        function (result){
            console.log("A new user status is created.");
            // response.success({
            //         code: 0,
            //         userStatusId: result.id,
            //         message: "A new user status is created.."
            // });
        },
        function (error){
            console.log("A user's status created failed. error msg:" + error);
            // response.error(error);
        }
    );
})
