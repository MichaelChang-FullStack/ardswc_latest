<?php
namespace Ardswc\User;

require_once("db.php");

class Points{
    private $MNo;

    private $levels = [
        'basic' => [
            'RoleID' => 1,
            'Apoints' => 0,
            'videoCount' => 0,
            'boost' => 1,
        ],
        'teacher' => [
            'RoleID' => 2,
            'Apoints' => 50,
            'videoCount' => 1,
            'boost' => 1.1,
        ],
        'bronze' => [
            'RoleID' => 3,
            'Apoints' => 100,
            'videoCount' => 2,
            'boost' => 1.2
        ],
        'silver' => [
            'RoleID' => 4,
            'Apoints' => 200,
            'videoCount' => 3,
            'boost' => 1.3
        ],
        'gold' => [
            'RoleID' => 5,
            'Apoints' => 500,
            'videoCount' => 5,
            'boost' => 1.5
        ]
    ];

    public function __construct($MNo = ''){
        if(!empty($MNo)){
            $this->MNo = $MNo;
        }
    }

    public function add($atts = []){
        if(!empty($atts)){
            $point = $atts['point']??'';
            $MNo = $atts['MNo']??'';

            if(!empty($point) && !empty($MNo)){
                $boost = $atts['boost']??false;
                if(true === $boost){
                    $level = $this->check_levels($MNo);
                    $point = $this->boost($point, $level);
                }

                $db = new \DB;
                
                $sql = "UPDATE dbo.TA_MEMBER_DATA
                SET Mpoints = ISNULL(Mpoints, 0) + $point,
                Apoints = ISNULL(Apoints, 0) + $point
                WHERE MNo = ?";

                $params = [$MNo];

                $db->query($sql, $params);

                $add_record = $atts['record']??false;
                if(true === $add_record){
                    
                }
            }
        }
    }

    public function boost($point, $level = []){
        if(empty($level)){
            $level = $this->check_levels($this->MNo);
            if(is_array($level) && !empty($level)){
                $level = $level['level'];
            }
        }

        $point = floatval($point) * $level['boost'];
        $point = round($point);

        return $point;
    }

    public function check_levels($MNo){
        $levels = $this->levels;

        $res = '';

        if(!empty($MNo)){
            $db = new \DB;

            $sql = "SELECT RoleID, Apoints, ISNULL(videoCount, 0) as videoCount FROM [TA_MEMBER_DATA] member
            LEFT JOIN(
                SELECT [MId], count(*) as videoCount FROM dbo.TA_MEMBERUPLOAD_DATA
                WHERE [State] = '已審核'
                GROUP BY [MId]
            ) video
            ON member.MNo = video.MId
            WHERE [MNo] = ? ";

            $params = [$MNo];

            $res = $db->query($sql, $params);

            if('db error!' !== $res){
                if(is_array($res) && !empty($res)){
                    $res = $res[0];

                    foreach($levels as $name => $level){
                        if($res['Apoints'] >= $level['Apoints'] && $res['videoCount'] >= $level['videoCount']){
                            $res['level'] = $level;
                        }
                    }

                    if($res['RoleID'] < $res['level']['RoleID']){
                        $sql = "UPDATE TA_MEMBER_DATA
                        SET RoleID = ?
                        WHERE MNo = ?";

                        $params = [$res['level']['RoleID'], $MNo];
                        $db->query($sql, $params);
                    }
                }
            }else{
                $res = '';
            }
        }

        return $res;
    }
}