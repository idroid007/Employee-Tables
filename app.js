
const app = angular.module("employee",[]); 
app.controller("employeeForm",["$scope","dataFactory",function($scope,dataFactory){
    $scope.addRow=function(){
        let row = {name:$scope.name,emp_code:$scope.emp_code,profile:$scope.profile,email:$scope.email};
    // calling function to check whether row is already present or not
        if($scope.checkRowDuplicates(row)){
            dataFactory.data.push(row);
    
        }else{

            $scope.duplicate=true;
        }
    }
    /*function to check row duplicates -> currently comparing with emp_code and email
    if any of the row contains current entry data emp_code or email then its a duplicates
    and we are not going to insert it
    */
    $scope.checkRowDuplicates=function(row){

        let rows = dataFactory.data;
        for(let i=0;i<rows.length;i++){
            if(row.emp_code==rows[i].emp_code || row.email==rows[i].email)
            return false;
        }
        return true;
    }
}]);
// list table controller
app.controller("employeeList",["$scope","dataFactory",function($scope,dataFactory){
    //data_state represents current state of data whether send data or sending...
    $scope.data_state="Send Data";
   
   
    $scope.sent=false;
    $scope.list=dataFactory.data;

    /*this function accept all the rows (list) and send it factory method sendData which
    will send data to server
    */
    $scope.check=function(rows){
        $scope.data_state="Sending.....";
     dataFactory.sendData(rows);
        
        $scope.data_state="Send Data";
    }
}]);

//factory service which deals with data / rows & back-end calls
app.factory("dataFactory",["$http",function($http){
    return {
        //in data property we are storing our data
     data : [{name:'ishu',emp_code:'Ty101',profile:'Developer',email:'ishubot@gmail.com'}],
    // in this function we are sending all the rows data to server
     sendData:function(rows){
        /*
           to send data we can directly send json array or send 1 row at a time using
           url-encoding both works great, currently sending json directly to the server
        */
        $http({
            method: 'POST',
            url: 'Employee',
            data:rows
        }).then(function(response){
                alert("Hurraayyyy Data Sent Succesffully");
             
        },function(error){
                alert("failure, looks like server is not responding.....")
              
        })
       
     }
    };
}])
