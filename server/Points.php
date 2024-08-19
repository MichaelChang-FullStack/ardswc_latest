<?php
namespace Ardswc\User;

require_once("db.php");

class Points{
    public function add($atts = []){
        if(!empty($atts)){
            $point = $atts['point']??'';
            $MNo = $atts['MNo']??'';

            if(!empty($point) && !empty($MNo)){
                $db = new \DB;
                
                $sql = "UPDATE dbo.TA_MEMBER_DATA
                SET Mpoints = Mpoints + $point,
                Apoints = Apoints + $point
                WHERE MNo = ?";

                $params = [$MNo];

                $db->query($sql, $params);

                $add_record = $atts['record']??false;
                if(true === $add_record){
                    
                }
            }
        }
    }
}