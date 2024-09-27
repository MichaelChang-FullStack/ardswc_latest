<?php
// email_template.php

// 定义邮件模板
$classTemplate = '
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
    <div class="container" style="background-color: #fff; padding: 20px; border-radius: 8px; max-width: 800px; margin: 0 auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;border: 1px solid #ccc;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px; border: 1px solid #ccc;">申請單通知</td>
            </tr>
            <tr>
                <td colspan="2" style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                    <p>親愛的 {{name}} 您好：<br>
                    {{message}}                    
                    </p>
                </td>
            </tr>
        </table>
        <table class="info-table" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px;border: 1px solid #ccc; font-weight: bold; width: 20%;">戶外教室申請單資訊</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請單編號</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">{{id}}</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請日期</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">{{currentDateTime}}</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請明細</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                    <div class="section" style="margin-bottom: 20px;">
                        <p>戶外教室: {{outdoorClassroom}}</p>
                        <p>團體名稱: {{groupName}}</p>
                        <p>聯絡人: {{name}}</p>
                        <p>聯絡電話: {{phone}}</p>
                        <p>聯絡地址: {{address}}</p>
                        <p>電子信箱: {{email}}</p>
                        <p>參觀日期: {{formattedVisitDateTime}}</p>
                        <p>報名人數: {{number}}</p>
                        <p>備註: {{remark}}</p>
                    </div>
                </td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請狀態</th>
                <td class="status-cell" style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                {{button}}
                </td>
            </tr>           
        </table>
        <table class="" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px; border: 1px solid #ccc; font-weight: bold; width: 20%;">注意事項</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">審核作業時間</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">您的申請最晚將於【申請預約後的5日內】審核完畢，也為避免浪費行政資源，若未確實填寫聯絡人、電話與相關基本資訊，造成須補件與延誤參訪日期，請申請人自行負責。</td>
            </tr>
          
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">申請狀態查詢</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">請至「<a href="#" style="color: blue; text-decoration: underline;">水保酷學堂 - 會員專區 - 戶外教室參訪 > 待審核</a>」查詢申請單處理情形。</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">其他</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">請注意，您申請的戶外教室若逾期未到訪或於三天前臨時取消累積兩次者，將取消線上預約參訪資格。</td>
            </tr>
        </table>
        <p style="font-weight: bold; color: red;">※此信件為系統發出信件，請勿直接回覆。</p>
    </div>
</body>
</html>
';
