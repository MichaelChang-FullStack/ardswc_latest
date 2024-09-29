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
            $MNo = $atts['MNo']??$this->MNo;

            if(!empty($point) && !empty($MNo)){
                $boost = $atts['boost']??false; // 等級加成
                if(true === $boost){
                    $level = $this->check_levels($MNo);
                    $point = $this->boost($point, $level['boost']);
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

    public function boost($point, $boost = ''){
        if(empty($boost)){
            $level = $this->check_levels($this->MNo);
            if(is_array($level) && !empty($level)){
                $boost = $level['boost'];
            }
        }else{
            $boost = 1;
        }

        $point = floatval($point) * $boost;
        $point = round($point);

        return $point;
    }

    public function minus($atts = []){
        if(!empty($atts)){
            $point = $atts['point']??'';
            $MNo = $atts['MNo']??$this->MNo;

            if(!empty($point) && !empty($MNo)){
                $db = new \DB;
                
                $sql = "UPDATE dbo.TA_MEMBER_DATA
                SET Mpoints = ISNULL(Mpoints, 0) - $point
                WHERE MNo = ?";

                // error_log($sql . PHP_EOL, 3, __DIR__ . '/debug.log');
                // error_log($MNo . PHP_EOL, 3, __DIR__ . '/debug.log');

                $params = [$MNo];

                $db->query($sql, $params);
            }
        }
    }

    public function check_levels($MNo){
        $levels = $this->levels;
        if(empty($MNo)){
            $MNo = $this->MNo;
        }

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
                            $res['level'] = $level['RoleID'];
                            $res['boost'] = $level['boost'];
                        }
                    }

                    if($res['RoleID'] < $res['level']){
                        $sql = "UPDATE TA_MEMBER_DATA
                        SET RoleID = ?
                        WHERE MNo = ?";

                        $params = [$res['level'], $MNo];
                        $db->query($sql, $params);
                    }
                }
            }else{
                $res = '';
            }
        }

        return $res;
    }

    public function save_record($record, $record_name = 'point_records', $MNo = ''){
        $db = new \DB;

        if(empty($MNo)){
            $MNo = $this->MNo;
        }

        if(!empty($MNo)){
            $currentRecords = $db->select([
                'table' => 'TA_MEMBER_METAS',
                'where' => [
                    'MetaKey' => $record_name,
                    'MemberNo' => $MNo,
                ],
            ]);

            if(!empty($currentRecords)){
                $currentRecords = json_decode($currentRecords[0]['MetaValue'], true);
            }
            if(empty($currentRecords)){
                $currentRecords = [];
            }

            $new_records = array_merge($currentRecords, [$record]);


            $db->update_meta('TA_MEMBER_METAS', $record_name, json_encode($new_records), [
                'MemberNo' => $MNo
            ]);
        }
    }
}