<?php
require_once dirname(__DIR__) . '/class-mailer.php';

class PrizeApplyDigitalEmailSender extends EmailSender{
    protected $table_title = '<p>親愛的 {{name}} 您好：<br>
    恭喜您成功集點，並申請兌換【{{prize_title}}】。我們將儘快處理您的兌換申請。
    </p>';
    protected $table_no = '{{id}}';
    protected $table_info_title = '點數兌換申請資訊';
    protected $table_info_date = '{{apply_date}}';
    protected $table_info_content = '<p>使用點數: {{cost}}</p>
    <p>兌換禮品: {{prize_title}}</p>
    <p>姓名: {{name}}</p>
    <p>電話: {{phone}}</p>
    <p>地址: {{address}}</p>';
    protected $table_status = '{{button}}';
    protected $table_notice = '您申請的禮品最晚將於次月15日前發放，請您耐心等待，屆時禮品券將會寄送至電子信箱。';
    protected $table_link = '請至「會員專區>點數兌換>「<a href="https://tarode.in/pages/user.html?page=points-redemption&tab=records" style="color: blue; text-decoration: underline;">兌換紀錄</a>」查詢處理情形。';
    protected $table_note = '請注意：<br>
    1. 結帳前請出示禮品券，不接受手抄或口說序號方式兌換。如因提供之序號無法辨識，兌換單位有權拒絕兌換。<br>
    2. 一張禮品券限兌換券上所載之指定禮品，無法更換或加價兌換其他禮品。<br>
    3. 禮品券序號具唯一性，僅限兌換一次，不可重複使用，截圖恕無法使用。<br>
    4. 禮品券無法兌換現金或找零，禮品一經兌換即不接受退貨';

    protected function get_header(){
        return '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;border: 1px solid #ccc;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px; border: 1px solid #ccc;">電子票券申請單通知</td>
            </tr>
            <tr>
                <td colspan="2" style="padding: 10px; text-align: left; border: 1px solid #ccc;">
                    ' . $this->table_title . '
                </td>
            </tr>
        </table>';
    }
}