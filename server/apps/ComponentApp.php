<?php
namespace app\modules\help\apps;

use app\core\apps\WebApp;

class ComponentApp extends WebApp {
    protected function body($params = []) {
        $type = isset($params["type"]) ? $params["type"] : "mmAddonTextfield";

        return [
            'type' => $type
        ];
    }
}