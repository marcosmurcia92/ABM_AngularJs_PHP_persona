<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'PHP/clases/Personas.php';
require 'PHP/clases/Usuario.php';
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $respuesta = Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($respuesta));
    
    return $response;
});

$app->get('/usuario[/{dni}]', function ($request, $response, $args) {
    $response->write(json_encode(Usuario::TraerUnUsuario($args['dni'])));
    return $response;
});

/* POST: Para crear recursos */
$app->post('/usuario/{dni}', function ($request, $response, $args) {
    $response->write(Usuario::TraerUnUsuario($args['dni']));
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/usuario/{id}', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    var_dump($args);
    var_dump($response);
    var_dump($request);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    $respuesta = Usuario::BorrarUsuario($args['id']);
    $response->write($respuesta);
    return $response;
});



//*PERSONAS*

// GET: traer todas las personas
$app->get('/personas[/]', function ($request, $response, $args) {
    $respuesta=Persona::TraerTodasLasPersonas();
    $arrayJson = json_encode($respuesta);
    $response->write($arrayJson);
    return $response;
});

// GET: traer una persona
$app->get('/persona[/{id}[/{name}]]', function ($request, $response, $args) {
    $respuesta = Persona::TraerUnaPersona($args['id']);
    $peronaJson = json_encode($respuesta);
    $response->write($peronaJson);
    return $response;
});

//POST: crear una persona
$app->post('/persona/{persona}', function ($request, $response, $args) {
    $persona = json_decode($args['persona']);
    if($persona->foto!="pordefecto.png")
        {
            $rutaVieja="PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$persona->foto;
            $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$rutaNueva);
            unlink($rutaVieja);
            $persona->foto=$rutaNueva;
        }
        if($persona->foto2!="pordefecto.png")
        {
            $rutaVieja="PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$persona->foto2;
            $rutaNueva=$persona->dni."B.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$rutaNueva);
            unlink($rutaVieja);
            $persona->foto2=$rutaNueva;
        }
        if($persona->foto3!="pordefecto.png")
        {
            $rutaVieja="PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$persona->foto3;
            $rutaNueva=$persona->dni."C.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$rutaNueva);
            unlink($rutaVieja);
            $persona->foto3=$rutaNueva;
        }
    $respuesta = Persona::InsertarPersona($persona);
    $response->write(json_encode($persona));
    return $response;
});

//PUT: Para editar una persona
$app->put('/persona/{persona}', function ($request, $response, $args) {
    var_dump($args['persona']);
    $persona = json_decode($args['persona']);
    if($persona->foto!="pordefecto.png")
    {
        $rutaVieja="PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$rutaNueva);
        unlink($rutaVieja);
        $persona->foto=$rutaNueva;
    }
    if($persona->foto2!="pordefecto.png")
    {
        $rutaVieja="PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$persona->foto2;
        $rutaNueva=$persona->dni."B.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$rutaNueva);
        unlink($rutaVieja);
        $persona->foto2=$rutaNueva;
    }
    if($persona->foto3!="pordefecto.png")
    {
        $rutaVieja="PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$persona->foto3;
        $rutaNueva=$persona->dni."C.".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "PHP".DIRECTORY_SEPARATOR."fotos".DIRECTORY_SEPARATOR.$rutaNueva);
        unlink($rutaVieja);
        $persona->foto3=$rutaNueva;
    }
    $respuesta = Persona::ModificarPersona($persona);
    $response->write($respuesta);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/persona/{id}', function ($request, $response, $args) {
    $respuesta = Persona::BorrarPersona($args['id']);
    $response->write($respuesta);
    return $response;
});



/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
