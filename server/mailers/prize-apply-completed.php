<?php
require_once __DIR__ . '/prize-apply.php';

class PrizeApplyCompletedEmailSender extends PrizeApplyEmailSender{
    protected $table_title = '<p>親愛的 {{name}} 您好：<br>
    恭喜您成功兌換【{{prize_title}}】。我們將立即寄出您的禮品。
    </p>';

    protected function get_footer(){
        return '<table class="" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
                <td colspan="2" style="text-align: center; font-weight: bold; font-size: larger;padding: 10px; border: 1px solid #ccc; font-weight: bold; width: 20%;">注意事項</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">兌換紀錄查詢</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_link . '</td>
            </tr>
            <tr>
                <th style="padding: 10px; text-align: left; border: 1px solid #ccc; font-weight: bold; width: 20%;">其他</th>
                <td style="padding: 10px; text-align: left; border: 1px solid #ccc;">' . $this->table_note . '</td>
            </tr>
        </table>';
    }
}