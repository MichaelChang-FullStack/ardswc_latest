<?php 

include('../config.php');
header('Content-Type: application/json; charset=utf-8');

$params = $columns = $totalRecords = $data = array();
$params = $_REQUEST;
//define index of columns
$columns = array( 
    1 => 'BookID',
    2 => 'BT_Name',
    3 => 'IS_Name',
    4 => 'Title',	
);
$where = $sqlTot = $sqlRec = "";
// getting total number records from table without any search
$sql = "SELECT * FROM dbo.VW_TA_BOOKS ";
$sqlTot .= $sql;
$sqlRec .= $sql;
$sqlRec .=  " ORDER BY BookID";
$queryTot = sqlsrv_query($conn, $sqlTot) or die("database error:");
//$totalRecords = mysqli_num_rows($queryTot);
$totalRecords = 0;

while (sqlsrv_fetch($queryTot)) {
    $totalRecords++;
}


$queryRecords = sqlsrv_query($conn, $sqlRec) or die("error to fetch employees data");
// iterate on results row and create new index array of data
/*while( $row = mysqli_fetch_row($queryRecords) ) { 
	$data[] = $row;
}	*/

while ($row = sqlsrv_fetch_array($queryRecords, SQLSRV_FETCH_ASSOC)) {
    $sub_array = array();
	$sub_array[] = '<div class="action_icon"><a href="javascript:void();" data-id="' . $row['BookID'] . '" onclick="reset_img_form_edit();"><div class="edit_data"><img src="assets/img/edit_data.png"></div></a>  <a href="javascript:void();" data-id="' . $row['BookID'] . '"  ><div class="delete_data"><img src="assets/img/delete_data.svg"></div></a></div>';
    $sub_array[] = $row['BookID'];
    $sub_array[] = $row['BT_Name'];
    $sub_array[] = $row['IS_Name'];
    $sub_array[] = $row['Title'];
    $sub_array[] = '';
    $data[] = $sub_array;
}


$json_data = array(
		"draw"            => 1,   
		"recordsTotal"    => intval( $totalRecords ),  
		"recordsFiltered" => intval($totalRecords),
		"data"            => $data
		);
// send data as json format
echo json_encode($json_data);  

?>