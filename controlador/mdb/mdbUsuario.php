<?php
    require_once(__DIR__."/../../modelo/dao/usuarioDAO.php");
            
    function autenticarUsuario($correo, $password){
        $dao=new usuarioDAO();
            //Se llama al método autenticarUsuario que se encuentra en la clase
            //UsuarioDAO
        $usuario = $dao->autenticarUsuario($correo, $password);
            //Retorna el usuario si lo encontró, de lo contrario retorna null
        return $usuario;
    }
    
    function registrarUsuario(usuario $usuario){
        $dao=new usuarioDAO();
        $usuario = $dao->registrarUsuario($usuario);
        return $usuario;
    }

    function buscarUsuarioPorId($id){
        $dao=new usuarioDAO();
        $usuario = $dao->buscarUsuarioPorId($id);
        return $usuario;
    }

    function actualizarUrlFotoPorId($id, $extension){
        $dao=new usuarioDAO();
        $dao->actualizarUrlFotoPorId($id, $extension);
    }

    function actualizarDatosUsuario(usuario $usuario){
        $dao=new usuarioDAO();
        return $dao->actualizarDatosUsuario($usuario);
    }

    function actualizarContrasena($idUsuario, $contrasena){
        $dao=new usuarioDAO();
        return $dao->actualizarContrasena($idUsuario, $contrasena);
    }

    function buscarUsuarios(){
        $dao=new usuarioDAO();
        return $dao->buscarUsuarios();
    }

    function buscarUsuarioPorSeudonimo($seudonimo){
        $dao=new usuarioDAO();
        return $dao->buscarUsuarioPorSeudonimo($seudonimo);
    }

    function buscarUsuarioPorCorreo($correo){
        $dao=new usuarioDAO();
        return $dao->buscarUsuarioPorCorreo($correo);
    }

    function actualizarEstadoUsuario($idUsuario, $estado) {
        $dao=new usuarioDAO();
        return $dao->actualizarEstadoUsuario($idUsuario, $estado);
    }

    function insertarToken($correo, $token){
        $dao=new usuarioDAO();
        return $dao->insertarToken($correo, $token);
    }
/*
    function verUsuarios(){
        $dao=new UsuarioDAO();
        $usuarios = $dao->verUsuarios();
        return $usuarios;
    } 

    function eliminarUsuario($idUsuario){
        $dao=new UsuarioDAO();
        $dao->eliminarUsuario($idUsuario);
    }

    function verUsuarioPorId($idUsuario){
        $dao=new UsuarioDAO();
        $usuario = $dao->verUsuarioPorId($idUsuario);
        return $usuario;
    }

    function editarUsuario($usuario){
        $dao=new UsuarioDAO();
        $dao->editarUsuario($usuario);
    }*/
?>