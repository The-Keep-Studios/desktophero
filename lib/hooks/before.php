<?php

$app->hook('slim.before', function() use($app, $config, $session) {
if ($session->get('loggedin')) {
    if ($session->get('expires') >= time()) {
        // Valid session

        $session->set('expires',strtotime('+' . $config->session_expires));

    } else {
        // Expired session

        $valid = false;
        if ($session->get('remember_token')) {
            // Try to login with remember token

            $response = $session->reload(array(
                'remember_token' => $session->get('remember_token'),
                'user.id'        => $session->get('user.id'),
                'remember'       => true,
            ));

            if ($response['info']['http_code'] == 201) {
                $valid = true;
            }
        }

        if (!$valid) {
            // Force logout

            cleanup_session();
            $app->flash('expired', true);
        }
    }
}

});

function cleanup_session() {
    session_destroy();
}
