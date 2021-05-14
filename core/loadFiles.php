<?php

if( isset( $_POST['my_file_upload'] ) ){
    $uploaddir = '../assets/images/product';

    if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );

    $files = $_FILES;
    $done_files = array();

    foreach( $files as $file ){
        $file_name = $file['name'];
        if( move_uploaded_file( $file['tmp_name'], "$uploaddir/$file_name" ) ){
            $done_files[] = realpath( "$uploaddir/$file_name" );
        }
    }

    $data = $done_files ? array('files' => $done_files) : array('error' => 'Ошибка загрузки файлов.');

    die(json_encode($data));
}