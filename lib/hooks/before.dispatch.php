<?php


$app->hook('slim.before.dispatch', function() use($app, $config, $session,$pdo) {
    $user_id = $session->get("user.id");
    if ($user_id) {
        $user = new \Softpath\User($pdo,$user_id);
        $route = $app->request->getResourceUri();
        $resource_manager = new \Softpath\ResourceManager($config->resources);
        $permission = $resource_manager->askPermission($route,$user->getRoles());
        if (!$permission) {
            //respond with 403 forbidden
            $app->halt(403,'Access denied.');
        }
    }
});
