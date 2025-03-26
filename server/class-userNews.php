<?php
namespace Ardswc\User;

require_once("db.php");

class News{
    private $db, $conn;

    public function __construct(){
        $this->db = new \DB();
        $this->conn = $this->db->get_conn();
    }

    private function getBodyData() {
        $jsonData = file_get_contents('php://input');
        $bodyData = json_decode($jsonData, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('解析 JSON 數據時發生錯誤: ' . json_last_error_msg());
        }

        return $bodyData;
    }

    public function handleAction($bodyData = []) {
        try{
            if(empty($bodyData)){
                $bodyData = $this->getBodyData();
            }

            $action = $bodyData['action']??'';

            switch($action) {
                case 'create':
                    return $this->create($bodyData);
                case 'read':
                    return $this->read($bodyData);
                case 'update':
                    return $this->update($bodyData);
                case 'updateAll':
                    return $this->updateAll($bodyData);
                default:
                    throw new \Exception('Invalid action');
            }
        }catch(\Throwable $e){
            error_log(print_r($e, true), 3, __DIR__ . '/debug.log');
            return ['error' => $e->getMessage()];
        }
    }

    public function create($data) {
        $Subject = $data['subject'];
        $CATEGORY_NO = $data['CATEGORY_NO'];
        $CATEGORY = $data['CATEGORY']??'';
        $MNo = $data['MNo'];
        $NE_NO = 'NE' . date('YmdHis') . '01';
        $ReadTimestamp = date('Y-m-d H:i:s');
        $Content = $data['content'] ?? null;
        $SOURCE_NO = $data['SOURCE_NO']?? null;

        $sql_news = "INSERT INTO [Learn_swcb_new].[dbo].[NEWS]
        (NE_NO, NE_SUBJECT, NE_CONTENT, NE_CREATEDATE, NE_ISONLINE, NE_ISTOP, NE_NEWWIN,
        NE_SEND_MEMBER, NE_CATEGORY_NO, NE_CATEGORY, NE_MNo,NE_SOURCE_NO)
        VALUES
        (?, ?, ?, GETDATE(), 0, 0, 0, 1, ?, ?, ?,?)";

        $params = array($NE_NO, $Subject, $Content, $CATEGORY_NO, $CATEGORY, $MNo,$SOURCE_NO);
        $stmt_news = sqlsrv_prepare($this->conn, $sql_news, $params);

        if ($stmt_news === false) {
            throw new \Exception('SQL preparation error: ' . print_r(sqlsrv_errors(), true));
        }

        if (sqlsrv_execute($stmt_news) === false) {
            throw new \Exception('SQL execution error: ' . print_r(sqlsrv_errors(), true));
        }


        // 插入 MemberNewsStatus 表
        $sql_member_status = "INSERT INTO [Learn_swcb_new].[dbo].[MemberNewsStatus]
        ([MNo], [NewsNO], [HasRead], [ReadTimestamp])
        VALUES (?, ?,0,?)";

        $params_status = array($MNo, $NE_NO, $ReadTimestamp);
        $stmt_member_status = sqlsrv_prepare($this->conn, $sql_member_status, $params_status);

        if ($stmt_member_status === false) {
            throw new \Exception('SQL preparation error: ' . print_r(sqlsrv_errors(), true));
        }

        if (sqlsrv_execute($stmt_member_status) === false) {
            throw new \Exception('SQL execution error: ' . print_r(sqlsrv_errors(), true));
        }

        return ['message' => 'Data inserted successfully into both NEWS and MemberNewsStatus.'];
    }


    public function read($data) {
        $MNo = $data['MNo'];

        // 使用参数化查询
        $sql = "    SELECT *
        FROM [Learn_swcb_new].[dbo].[NEWS] as a
        left join [Learn_swcb_new].[dbo].[MemberNewsStatus] as b ON a.NE_NO = b.NewsNO
        WHERE b.MNo =  ?
        and  a.NE_SEND_MEMBER = 1
        ORDER BY NE_CREATEDATE DESC";

        // 准备查询
        $stmt = sqlsrv_prepare($this->conn, $sql, array($MNo));
        if ($stmt === false) {
            throw new \Exception('SQL preparation error: ' . print_r(sqlsrv_errors(), true));
        }

        // 执行查询
        $result = sqlsrv_execute($stmt);
        if ($result === false) {
            throw new \Exception('SQL execution error: ' . print_r(sqlsrv_errors(), true));
        }

        // 获取数据
        $json_array = array();
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $json_array[] = $row;
        }

        return $json_array;
    }


    public function update($data) {
        $NO = $data['NO'];
        $MNo = $data['MNo'];

        // 使用参数化查询
        $sql = "UPDATE [Learn_swcb_new].[dbo].[MemberNewsStatus]
        SET HasRead = 1
        WHERE NewsNO = ? and MNo = ?";

        // 准备查询
        $stmt = sqlsrv_prepare($this->conn, $sql, array($NO,$MNo));
        if ($stmt === false) {
            throw new \Exception('SQL preparation error: ' . print_r(sqlsrv_errors(), true));
        }

        // 执行查询
        $result = sqlsrv_execute($stmt);
        if ($result === false) {
            throw new \Exception('SQL execution error: ' . print_r(sqlsrv_errors(), true));
        }


        return ['message' => 'updated'];
    }

    public function updateAll($data) {
        $MNo = $data['MNo'];

        // 使用参数化查询
        $sql = "UPDATE [Learn_swcb_new].[dbo].[MemberNewsStatus]
        SET HasRead = 1
        WHERE MNo = ?";

        // 准备查询
        $stmt = sqlsrv_prepare($this->conn, $sql, array($MNo));
        if ($stmt === false) {
            throw new \Exception('SQL preparation error: ' . print_r(sqlsrv_errors(), true));
        }

        // 执行查询
        $result = sqlsrv_execute($stmt);
        if ($result === false) {
            throw new \Exception('SQL execution error: ' . print_r(sqlsrv_errors(), true));
        }


        return ['message' => 'updated'];
    }

    // private function delete($data) {
    //     // Implement delete functionality
    // }
}
