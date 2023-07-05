<?php

$viewConfig = require("config/view.php");

return [
    "name" => "help",
    "label" => "Help Docs",
    "version" => 1,
    "models" => [
        "View" => $viewConfig,
        "App" => [
            [
                "name" => "component",
                "path" => "app\\modules\\help\\apps\\ComponentApp",
                "clients" => ["component"],
                "view" => "component.app",
                "requireLogin" => false
            ]
        ]
    ]
];