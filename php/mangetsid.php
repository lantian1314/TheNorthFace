<?php
header('content-type:text/html;charset=utf-8');
define('HOST','localhost');
define('USERNAME','root');
define('PASSWORD','12345678');
define('DBNAME','taobao');

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//连接数据库
//@:容错处理，错误信息不显示。
if($conn->connect_error){//如果存在错误，输出错误。
    die('数据库连接错误,错误信息：'.$conn->connect_error);
}

$conn->query('SET NAMES UTF8');

if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $result=$conn->query("select * from taobaopic where sid=$sid");
    echo json_encode($result->fetch_assoc());
}else{
    exit('非法操作');
}