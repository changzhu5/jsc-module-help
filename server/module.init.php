<?php
use yii\helpers\Url;
/**
 * For template: index
 */

\Yii::$app->on("onDisplayMenuUser", function($e) use($module) {

    $payload = $e->payload;
    
    $payload['links'][] = [
        'label' => $module->label,
        'href' => Url::toRoute("/help/component", true),
        'icon' => "book",
        'value' => $module->id,
        'position' => 'right'
    ];

    $e->payload = $payload;
});