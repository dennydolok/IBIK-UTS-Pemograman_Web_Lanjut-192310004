<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class APIRequest extends CI_Controller {

	function __Construct(){
        parent ::__construct();
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: *");
        header('Access-Control-Allow-Methods: GET, POST');
        header("Access-Control-Allow-Headers: *");
        header('Content-Type: application/json');       
        $this->load->library('JWT');
        $this->load->model("General_model");
    }

	public function authentification(){
		$result = array();
		$reqdata = $this->input->post();
		if($reqdata){
			$key = "Bearuang16";
            $data_arr = (array) $this->jwt->decode($reqdata['token'],$key);
            $data_arr['password'] = md5($data_arr['password']);
            $isExist = $this->General_model->fetchData("users",array("Username"=>$data_arr['username'],"Password"=>$data_arr['password']))->row(); //row() => 1 data/baris, result()=> lebih dari 1 data
            if(!empty($isExist)){
            	unset($isExist->Password);
            	$currDate = date('Y-m-d H:i:s');
                $timestamp = strtotime($currDate) + 60*60;
                $expiredTime = date('Y-m-d H:i:s', $timestamp);
            	$isExist->Expired = $expiredTime;
            	$result = array("return"=>true,"message"=>"Data ditemukan","result"=>$isExist);	
            }else{
            	$result = array("return"=>false,"message"=>"Data tidak ditemukan","result"=>null);
            }            
		}
		echo json_encode($result);
	}
}
