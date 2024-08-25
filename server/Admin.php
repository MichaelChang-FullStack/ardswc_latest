<?php
namespace Ardswc\Frontend;

class Admin{
    public function is_admin(){
        session_start();
        if (!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] !== true) {
            $isAdmin = false;
        }else{
            $isAdmin = true;
        }

        return $isAdmin;
    }
}