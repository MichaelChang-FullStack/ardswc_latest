<?php
require_once dirname(__DIR__) . '/class-mailer.php';

class PrizeApplyEmailSender extends EmailSender{
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
    protected $table_notice = '您申請的實體禮品將於次月15日前發放，請您耐心等待。為避免浪費行政資源，若未確實填寫聯絡人、電話與相關基本資訊，造成須補件或禮品無法送達，請申請人自行負責。';
    protected $table_link = '請至「會員專區>點數兌換>「<a href="https://tarode.in/pages/user.html?page=points-redemption&tab=records" style="color: blue; text-decoration: underline;">兌換紀錄</a>」查詢處理情形。';
    protected $table_note = '請注意，如因您填寫的聯絡人、電話與聯絡地址等相關基本資訊有誤，造成獎品無法寄達，恕不補發禮品。';
}